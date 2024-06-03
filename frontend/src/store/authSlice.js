import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const initialState = {
    isAuthenticated: false,
    token: null,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload;
            state.error = null;
        },
        loginFailure(state, action) {
            state.error = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.error = null;
        }
    }
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (email, password) => async dispatch => {
    console.log(email, password);
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        dispatch(loginSuccess(response.data.token));
        localStorage.setItem('token', response.data.token);
        Navigate('/home');
    } catch (err) {
        dispatch(loginFailure('Login failed. Please check your email and password.'));
    }
};

export const signup = (name, email, password) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
        dispatch(loginSuccess(response.data.token));
        localStorage.setItem('token', response.data.token);
    } catch (err) {
        dispatch(loginFailure('Signup failed. Please try again.'));
    }
};

export const logoutReducer = () =>async dispatch => {
    dispatch(logout());
}
export default authSlice.reducer;
