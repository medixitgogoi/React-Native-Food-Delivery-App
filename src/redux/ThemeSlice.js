import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: "LIGHT"
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            return state.theme = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;