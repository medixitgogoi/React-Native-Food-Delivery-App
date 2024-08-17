import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {

            const newItem = action.payload;
            const existingItemIndex = state.findIndex(item => item.id === newItem.id);

            if (existingItemIndex !== -1) {
                state[existingItemIndex].qty += 1;
            } else {
                state.push({ ...newItem, qty: 1 });
            }
        },
        removeItemFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
        decrementItem: (state, action) => {
            const newItem = action.payload;
            const existingItemIndex = state.findIndex(item => item.id === newItem.id);
            state[existingItemIndex].qty -= 1;
        },
        deleteAllItemsFromCart: (state) => {
            return state = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { addItemToCart, removeItemFromCart, decrementItem, deleteAllItemsFromCart } = cartSlice.actions;
export default cartSlice.reducer;