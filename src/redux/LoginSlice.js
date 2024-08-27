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
















// import { createSlice } from '@reduxjs/toolkit';

// const initialState = [];

// export const loginSlice = createSlice({
//     name: 'login',
//     initialState,
//     reducers: {
//         addLoginUser: (state, action) => {
//             state.push(action.payload);
//         },
//         logoutUser: (state) => {
//             return state = [];
//         },
//     },
// })

// export const { addLoginUser, logoutUser } = loginSlice.actions;
// export default loginSlice.reducer;