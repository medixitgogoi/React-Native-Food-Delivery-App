import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItemToWishlist: (state, action) => {

            const newItem = action.payload;
            const existingItemIndex = state.findIndex(item => item.id === newItem.id);

            if (existingItemIndex === -1) {
                state.push({ ...newItem });
            }
        },
        removeItemFromWishlist: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
        deleteAllItemsFromWishlist: (state) => {
            return state = [];
        }
    },
})

export const { addItemToWishlist, removeItemFromWishlist, deleteAllItemsFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;