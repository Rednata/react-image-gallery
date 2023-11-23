import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../store/token/tokenSlice';
import authReducer from '../store/auth/authSlice';
import postsReducer from '../store/posts/postsSlice';
import likedReducer from '../store/liked/likedSlice';
import { tokenMiddleware } from './token/tokenAction';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    posts: postsReducer,
    liked: likedReducer,
  },
  middleware: (getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware))
});

