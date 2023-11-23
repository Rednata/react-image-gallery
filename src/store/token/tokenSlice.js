import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  error: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload.token;
    },
    deleteToken: (state) => {
      state.token = '';
    },
    tokenRequest: (state) => {
      state.error = '';
    },
    tokenRequestSuccess: (state, action) => {
      state.token = action.payload.token;
    },
    tokenRequestError: (state, action) => {
      state.error = action.payload.error;
    },
  }
});

export default tokenSlice.reducer;
