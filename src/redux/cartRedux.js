import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        id: null,
    },
    reducers: {
        addProduct: (state, action) => {
            let addOn = false;
            state.quantity += action.payload.quantity;
            state.total += action.payload.price * action.payload.quantity;
            state.products.forEach((product) => {
                if (product._id === action.payload._id) {
                    product.quantity += action.payload.quantity;
                    addOn = true;
                }
            })

            if (addOn === false) state.products.push(action.payload);

        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload._id)
            state.quantity -= action.payload.quantity;
            state.total -= action.payload.quantity * action.payload.price;
        },
        plus: (state, action) => {
            state.products.forEach((product) => {
                if (product._id === action.payload._id) {
                    product.quantity += 1;
                }
            })
            state.quantity += 1;
            state.total += action.payload.price;
        },
        minus: (state, action) => {
            state.products.forEach((product) => {
                if (product._id === action.payload._id) {
                    product.quantity -= 1;
                }
            })
            state.quantity -= 1;
            state.total -= action.payload.price;
        },
        addId: (state, action) => {
            state.id = action.payload;
        },
        removeId: (state, action) => {
            state.id = null;
        },
        emptyCart: (state, action) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
})

export const { addProduct, addId, removeId, emptyCart, removeProduct, plus, minus } = cartSlice.actions;
export default cartSlice.reducer;