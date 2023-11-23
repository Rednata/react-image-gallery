import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  page: 0,
  error: '',
  loading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsRequest: (state) => {
      state.loading = true;
    },
    postsRequestSuccess: (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, ...action.payload.posts];
      state.error = '';
      state.page += 1;
    },
    postsRequestError: (state, action) => {
      state.loading = false;
      state.error = '';
    },
  }
});

export default postsSlice.reducer;
