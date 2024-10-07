import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: {}
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

export const { setWriteUp } = writeUpSlice.actions;
export default writeUpSlice.reducer;