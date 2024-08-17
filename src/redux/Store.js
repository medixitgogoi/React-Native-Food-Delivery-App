import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./CartSlice";
import userReducer from "./UserSlice";
import wishlistReducer from "./WishlistSlice";
import themeReducer from './ThemeSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer,
        theme: themeReducer,
    },
})