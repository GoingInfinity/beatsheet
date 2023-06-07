import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '../../utils/check-environment';
import findIndex from 'lodash.findindex';
import { addColumnToBoard } from './acts';

type CardPatch = {
  _id: string;
  title?: string;
  description?: string;
  columnId?: string;
  assignedTo?: string;
  sequence?: number;
};

type shiftCardsType = {
    fromListId: string,
    toListId: string,
    fromTaskIdx: number,
    toTaskIdx: number
}

const initialState = {
  cards: [],
  status: 'idle',
  isRequesting: false,
  isDeleting: false,
  doneFetching: true,
  error: {}
};

const host = checkEnvironment();

export const fetchCards = createAsyncThunk('cards/fetchCards', async (_obj, { getState }) => {
  const { acts } = getState();
    const { columns } = acts;
    const actsQueryArray = columns.map((topic) => {
        return { id: topic.id, url: `${host}/acts/${topic.id}/beats` }
    })
    const beats: any = {}
    const response = await Promise.all(actsQueryArray.map(async (query: {id: string, url: string}) => {
        const res = await fetch(query.url)
        const json = await res.json()
        beats[query.id] = json
        return json
    }))
  return beats;
});

export const deleteCard = createAsyncThunk(
  'card/deleteCard',
  async (obj: {actId: string, beatId: string}, { getState }) => {
    const { beats } = getState()
    const { cards } = beats
    const updatedCardsList = {...cards}
    updatedCardsList[obj.actId] = [...updatedCardsList[obj.actId]].filter((item) => item.id !== obj.beatId)
    const url = `${host}/acts/${obj.actId}/beats/${obj.beatId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    });

    return updatedCardsList;
  }
);

export const addCard = createAsyncThunk('card/addCard', async (columnId: string, { getState }) => {
  const { beats } = getState();

  const data = {
    cameraAngle: "Camera Angle details",
    content: "Content details",
    notes: "notes",
    name: `Beat ${beats.cards[columnId].length + 1}`
  };

  const url = `${host}/acts/${columnId}/beats`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  const inJSON = await response.json();
  const resPayload = {...beats.cards}
  if (!resPayload[columnId]) {
    resPayload[columnId] = []
  }

  resPayload[columnId] = [...resPayload[columnId], inJSON]
  return resPayload;
});

export const updateCard = createAsyncThunk(
  'card/updateCard',
  async (obj: CardPatch, { getState }) => {
    const { board } = getState() as { board: any };

    const url = `${host}/api/boards/${board.board._id}/cards/${obj._id}`;

    const response = await fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(obj)
    });

    const inJSON = await response.json();

    return inJSON;
  }
);

export const updateCardSequence = createAsyncThunk(
  'card/updateCardSequence',
  async (obj: { actId: number, beatId: number, form: any}, { getState }) => {
    const { beats } = getState()
    const { cards } = beats

    const url = `${host}/acts/beats/${obj.beatId}`;

    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(obj.formData)
    })

    const updatedCardsList = {...cards}
    updatedCardsList[obj.actId] = [...updatedCardsList[obj.actId]].map((item) => {
        if (item.id == obj.beatId) {
            return {...item, ...obj.formData}
        } else {
            return item
        }
    })

    return updatedCardsList;
  }
);


export const shiftCards = createAsyncThunk(
    'card/shiftCards',
    async (obj: shiftCardsType, { getState }) => {
        const { fromListId, toListId, toTaskIdx, fromTaskIdx } = obj
        const { beats } = getState()
        const response = [...beats.cards[fromListId]]
        const shiftItem = response.splice(fromTaskIdx, 1)[0]
        response.splice(toTaskIdx,0, shiftItem)
        const updatedCards = {...beats.cards}
        updatedCards[fromListId] = response
        return updatedCards
    }
  );

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    resetCards: () => initialState,
    updateCardSequenceToLocalState: (state, { payload }) => {
      const cardIndex = findIndex(state.cards, { _id: payload._id });

      state.cards[cardIndex].sequence = payload.sequence;
      state.cards[cardIndex].columnId = payload.columnId;
    }
  },
  extraReducers: {
    [addCard.pending.toString()]: (state) => {
      state.isRequesting = true;
      state.status = 'pending';
    },
    [addCard.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
      state.cards = payload
      state.isRequesting = false;
    },
    [addCard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [fetchCards.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [fetchCards.fulfilled.toString()]: (state, { payload }) => {
      state.cards = payload;
      state.status = 'success';
      state.isRequesting = false;
    },
    [fetchCards.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [deleteCard.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isDeleting = true;
    },
    [deleteCard.fulfilled.toString()]: (state, { payload }) => {
        console.log('payload', payload)
      state.cards = payload
      state.status = 'success';
      state.isDeleting = false;
    },
    [deleteCard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isDeleting = false;
    },
    [updateCard.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [updateCard.fulfilled.toString()]: (state) => {
      state.status = 'success';
      state.isRequesting = false;
    },
    [updateCard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [updateCardSequence.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [updateCardSequence.fulfilled.toString()]: (state, { payload }) => {        
      state.cards = payload;
      state.status = 'success';
    },
    [updateCardSequence.rejected.toString()]: (state) => {
      state.status = 'failed';
    },
    [shiftCards.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [shiftCards.fulfilled.toString()]: (state, { payload }) => {
        state.cards = payload
        console.log('pay', payload)
      state.status = 'success';
    },
    [shiftCards.rejected.toString()]: (state) => {
      state.status = 'failed';
    },
    [addColumnToBoard.fulfilled.toString()]: (state, { payload }) => {
        console.log("inside beats", payload)
        const lastId = payload?.at(-1)?.id
        if (lastId) {
            state.cards[lastId] = []
        }
    },
  }
});

export const { resetCards, updateCardSequenceToLocalState, updateCardOrder } = cardsSlice.actions;

export default cardsSlice.reducer;
