import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../store/token/tokenSlice';
import authReducer from '../store/auth/authSlice';
import { tokenMiddleware } from './token/tokenAction';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware))
});

