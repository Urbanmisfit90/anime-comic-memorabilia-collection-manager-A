import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the item type
export interface CollectionItem {
  id: string;
  name: string;
  brand: string;
  series: string;
  character: string;
  type: string;
  condition: string;
  tags: string[];
  photoUrl: string;
}

// Define the initial state structure
interface CollectionState {
  items: CollectionItem[];
}

// Initial state
const initialState: CollectionState = {
  items: [],
};

// Create the slice
const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CollectionItem>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Other actions like editItem or updateItem can go here if needed
  },
});

// Export actions
export const { addItem, removeItem } = collectionSlice.actions;

// Export the reducer to be included in the store
export default collectionSlice.reducer;
