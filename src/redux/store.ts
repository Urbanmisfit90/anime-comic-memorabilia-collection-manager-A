import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './collectionSlice';

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
