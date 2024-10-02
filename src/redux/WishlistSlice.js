import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []  // Store the wishlist items inside an object
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.items = action.payload;
        },
        addItemToWishlist: (state, action) => {
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);

            if (existingItemIndex === -1) {
                state.items.push({ ...newItem });
            }
        },
        removeItemFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        deleteAllItemsFromWishlist: (state) => {
            state.items = [];
        },
    },
});

export const { addItemToWishlist, removeItemFromWishlist, deleteAllItemsFromWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
