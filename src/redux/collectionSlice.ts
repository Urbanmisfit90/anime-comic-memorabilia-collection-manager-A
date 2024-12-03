import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Item type that represents a collection item
export interface Item {
  id: string;
  name: string;
  brand: string;
  series: string;
  character: string;
  type: string;
  condition: string;
  tags: string;
  photo: string;
}

interface CollectionState {
  items: Item[];
}

const initialState: CollectionState = {
  items: [],
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = collectionSlice.actions;
export default collectionSlice.reducer;