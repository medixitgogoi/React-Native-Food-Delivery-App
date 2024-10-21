import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./CartSlice";
import userReducer from "./UserSlice";
import wishlistReducer from "./WishlistSlice";
import loginReducer from "./LoginSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer,
        login: loginReducer,
    },
})