import { createSlice, current } from '@reduxjs/toolkit';

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
      console.log('state: ', state);
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
      state.error = action.payload.error;
    },
    updatePostLiked: (state, action) => {
      console.log('action: ', action);
      const temp = current(state);
      console.log('temp: ', temp);
      console.log(
        '[action.payload.likePostIndex] ==', action.payload.likePostIndex,
        typeof action.payload.likePostIndex);
      console.log('temp.posts[action.likePostIndex.likePostIndex].liked',
        temp.posts[action.payload.likePostIndex].liked);
      console.log('action.payload.like === ', action.payload.like);
      temp.posts[action.payload.likePostIndex].liked = action.payload.like;
      state.loading = false;
      state.posts = [...temp];
      state.error = '';
    },
  }
});

export default postsSlice.reducer;
