import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default is localStorage
import collectionReducer from './collectionSlice';

// Configure persist
const persistConfig = {
  key: 'root',
  storage, // Use localStorage as the default storage
};

const persistedReducer = persistReducer(persistConfig, collectionReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: {
    collection: persistedReducer,
  },
});

// Create persistor
export const persistor = persistStore(store);

// Export the store
export default store;

// Export RootState type for use in components
export type RootState = ReturnType<typeof store.getState>;


