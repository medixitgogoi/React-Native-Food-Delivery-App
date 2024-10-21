import { createSlice } from '@reduxjs/toolkit';

// CartSlice.js
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload;
        },
        addItemToCart: (state, action) => {
            if (state.length != 0) {
                const existingItem = state.length != 0 && state.items.find(item => item.id === action.payload.id);

                if (existingItem) {
                    return;
                } else {
                    state.items.push(action.payload);
                }
            }
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        deleteAllItemsFromCart: (state) => {
            return state = [];
        },
    },
});

export const { setCartItems, addItemToCart, removeItemFromCart, deleteAllItemsFromCart } = cartSlice.actions;
export default cartSlice.reducer;