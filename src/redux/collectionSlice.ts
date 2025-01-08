import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
    _id: string; // Use _id to match MongoDB
    name: string;
    brand: string;
    series?: string;
    character?: string;
    type?: string;
    condition?: string;
    tags?: string;
    photo?: string;
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
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload); // Use _id here as well
        },
        setItems: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
        },
    },
});

export const { addItem, removeItem, setItems } = collectionSlice.actions; // Correct export
export default collectionSlice.reducer;