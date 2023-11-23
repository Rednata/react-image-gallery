import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: {},
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.auth = {};
    },
    authRequest: (state) => {
      state.error = '';
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload.auth;
      state.error = '';
    },
    authRequestError: (state, action) => {
      state.auth = {};
      state.error = action.payload.error;
    },
  }
});

export default authSlice.reducer;
