import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []  // Store the wishlist items inside an object
};

export const writeUpSlice = createSlice({
    name: 'writeup',
    initialState,
    reducers: {
        setWriteUp: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { addItemToWishlist, removeItemFromWishlist, deleteAllItemsFromWishlist, setWishlist } = wishlistSlice.actions;
export default writeUpSlice.reducer;