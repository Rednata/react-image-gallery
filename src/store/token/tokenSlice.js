import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.token;
    },
    tokenRequest: (state) => {
    },
    tokenRequestSuccess: (state, action) => {
      state.token = action.payload.token;
    },
    tokenRequestError: (state, action) => {
      state.error = action.payload.error;
    },
    // updateToken: (state, action) => {
    //   state.token = action.token;
    // }
  }
});

export default tokenSlice.reducer;
