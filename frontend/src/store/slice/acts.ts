import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '../../utils/check-environment';

const initialState = {
  columns: [],
  status: 'idle',
  isRequesting: false,
  doneFetching: true,
  error: {},
  darkMode: false,
};

const host = checkEnvironment();

export const fetchColumns = createAsyncThunk('acts/fetchColumns', async (_obj, { getState }) => {
  const response = await fetch(`${host}/acts`).then((response) =>
    response.json()
  );
    console.log('data', response)
  return response;
});

export const deleteColumn = createAsyncThunk(
  'column/deleteColumn',
  async (obj: { id: string}, { getState }) => {
    const { acts } = getState() as { acts: any };
    const { columns } = acts;
    
    const resPayload = [...columns].filter((item) => item.id !== obj.id)
    
    const url = `${host}/acts/${obj.id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).catch((e) => console.error(e))

    return resPayload;
  }
);

export const addColumnToBoard = createAsyncThunk(
  'column/add',
  async (name: string, { getState }) => {
    const { acts } = getState() as { acts: any };
    const { columns } = acts

    const data = {
        name: name
    };

    const url = `${host}/acts`;

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "accept": "application/json"
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    })
    const inJSON = await response.json();
    
    return [...columns, inJSON]
  }
);

export const columnsSlice = createSlice({
  name: 'acts',
  initialState: initialState,
  reducers: {
    resetColumns: () => initialState,
    darkMode: (state, { payload }) => {
        console.log('payload', payload)
      state.darkMode = payload
    }
  },
  extraReducers: {
    [addColumnToBoard.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [addColumnToBoard.fulfilled.toString()]: (state, { payload }) => {
      state.status = 'success';
      state.columns = payload
      state.isRequesting = false;
    },
    [addColumnToBoard.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [fetchColumns.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [fetchColumns.fulfilled.toString()]: (state, { payload }) => {
      const sortedColumns = payload.sort((a, b) => a.sequence - b.sequence);

      state.columns = sortedColumns;
      state.status = 'success';
      state.isRequesting = false;
    },
    [fetchColumns.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
    [deleteColumn.pending.toString()]: (state) => {
      state.status = 'pending';
      state.isRequesting = true;
    },
    [deleteColumn.fulfilled.toString()]: (state, { payload }) => {
      state.columns = payload;
      state.status = 'success';
      state.isRequesting = false;
    },
    [deleteColumn.rejected.toString()]: (state) => {
      state.status = 'failed';
      state.isRequesting = false;
    },
  }
});

export const { resetColumns, darkMode } = columnsSlice.actions;

export default columnsSlice.reducer;
