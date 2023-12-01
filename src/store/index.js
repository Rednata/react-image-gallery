import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../store/token/tokenSlice';
import authReducer from '../store/auth/authSlice';
import postsReducer from '../store/posts/postsSlice';
import { tokenMiddleware } from './token/tokenAction';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware))
});

