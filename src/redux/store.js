import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './collectionSlice';
export const store = configureStore({
    reducer: {
        collection: collectionReducer,
    },
});
