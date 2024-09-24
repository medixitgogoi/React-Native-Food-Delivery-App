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
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { setCartItems, addItemToCart, deleteAllItemsFromCart } = cartSlice.actions;
export default cartSlice.reducer;


















// import { createSlice } from '@reduxjs/toolkit';

// const initialState = [];

// export const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addItemToCart: (state, action) => {

//             const newItem = action.payload;
//             const existingItemIndex = state.findIndex(item => item.id === newItem.id);

//             if (existingItemIndex !== -1) {
//                 state[existingItemIndex].qty += 1;
//             } else {
//                 state.push(newItem);
//             }
//         },
//         removeItemFromCart: (state, action) => {
//             return state.filter(item => item.id !== action.payload.id);
//         },
//         decrementItem: (state, action) => {
//             const newItem = action.payload;
//             const existingItemIndex = state.findIndex(item => item.id === newItem.id);
//             state[existingItemIndex].qty -= 1;
//         },
//         deleteAllItemsFromCart: (state) => {
//             return state = [];
//         },
//         updateProduct: (state, action) => {
//             const { id, updatedUnits } = action.payload;

//             // Find the product by id and update its units
//             const product = state.find(item => item.id === id);

//             if (product) {
//                 product.units = updatedUnits;
//             }
//         },
//     },
// })

// // Action creators are generated for each case reducer function
// export const { addItemToCart, removeItemFromCart, decrementItem, deleteAllItemsFromCart, updateProduct } = cartSlice.actions;
// export default cartSlice.reducer;