import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import collectionReducer from './collectionSlice';

// Redux Persist config
const persistConfig = {
  key: 'root',
  storage, // Use localStorage to persist data
};

const persistedReducer = persistReducer(persistConfig, collectionReducer);

const store = configureStore({
  reducer: {
    collection: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;