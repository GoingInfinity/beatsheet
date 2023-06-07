import { configureStore } from '@reduxjs/toolkit';
import actsSlice from './slice/acts'
import beatsSlice from './slice/beats'

export const store = configureStore({
  reducer: {
    acts: actsSlice,
    beats: beatsSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

