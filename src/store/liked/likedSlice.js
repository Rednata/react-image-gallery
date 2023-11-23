import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  liked: [],
  error: '',
};

export const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    likedRequest: (state) => {
      state.error = '';
    },
    likedRequestSuccess: (state, action) => {
      state.liked = action.payload.data;
      state.error = '';
    },
    likedRequestError: (state, action) => {
      state.auth = {};
      state.error = action.payload.error;
    },
  }
});

export default likedSlice.reducer;
