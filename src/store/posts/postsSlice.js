import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  page: 0,
  error: '',
  loading: false,
  search: 'christmas',
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
    postsRequestSuccessBegin: (state, action) => {
      state.loading = false;
      state.posts = [...action.payload.posts];
      state.error = '';
      state.page = 1;
    },
    postsRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    postsUpdate: (state, action) => {
      state.posts = [...action.payload.newPosts];
    },
    searchUpdate: (state, action) => {
      state.search = action.payload.value;
    },
  }
});

export default postsSlice.reducer;
