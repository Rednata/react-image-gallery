import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  liked: {},
  error: '',
};

export const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    likedPostRequest: (state) => {
      state.error = '';
    },
    likedPostRequestSuccess: (state, action) => {
      state.liked = action.payload.photo;
      state.error = '';
    },
    likedPostRequestError: (state, action) => {
      state.liked = {};
      state.error = action.payload.error;
    },
    updatePostLiked: (state, action) => {
      state.loading = false;
      state.liked = action.payload.data;
      state.error = '';
    },
  },
});

export default likedSlice.reducer;
