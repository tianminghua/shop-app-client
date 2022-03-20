import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isLoggedIn: false,
        usernameError: false,
        emailError: false,
    },
    reducers: {
        loginStart: (state, action) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
            state.isLoggedIn = true;
            state.usernameError = false;
            state.emailError = false;
        },
        loginFailure: (state, action) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = true;
            state.isLoggedIn = false;
            state.usernameError = false;
            state.emailError = false;
        },
        logOut: (state, action) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
            state.isLoggedIn = false;
            state.usernameError = false;
            state.emailError = false;
        },
        usernameError: (state, action) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
            state.isLoggedIn = false;
            state.usernameError = true;
            state.emailError = false;
        },
        emailError: (state, action) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
            state.isLoggedIn = false;
            state.usernameError = false;
            state.emailError = true;
        },
    },
})

export const { loginStart, loginSuccess, loginFailure, logOut, usernameError, emailError } = userSlice.actions;
export default userSlice.reducer;