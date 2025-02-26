import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    items: [],
};
const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload); // Use _id here as well
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
});
export const { addItem, removeItem, setItems } = collectionSlice.actions; // Correct export
export default collectionSlice.reducer;
