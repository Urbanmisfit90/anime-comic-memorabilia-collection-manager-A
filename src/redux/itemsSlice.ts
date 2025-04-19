import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getItems, Item } from '../services/api';

export const fetchItems = createAsyncThunk<Item[]>('items/fetchItems', async () => {
  const items = await getItems();
  return items;
});

interface ItemsState {
    items: Item[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null,
  };
  
  const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchItems.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchItems.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch items';
        });
    },
  });
  
  export default itemsSlice.reducer;
  