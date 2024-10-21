import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUserLoggedIn: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state) => {
            state.isUserLoggedIn = true;
        },
        logout: (state) => {
            state.isUserLoggedIn = false;
        },
    },
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;