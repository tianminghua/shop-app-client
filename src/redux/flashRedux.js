import { createSlice } from '@reduxjs/toolkit'

const flashSlice = createSlice({
    name: "flash",
    initialState: {
        hasFlash: false,
        message: '',
    },
    reducers: {
        setFlash: (state, action) => {
            state.hasFlash = true;
            state.message = action.payload;
        },
        removeFlash: (state, action) => {
            state.hasFlash = false;
            state.message = '';
        },

    },
})

export const { setFlash, removeFlash } = flashSlice.actions;
export default flashSlice.reducer;