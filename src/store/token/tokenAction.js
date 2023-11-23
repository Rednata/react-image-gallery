import axios from 'axios';
import { setToken } from '../../api/token';
import { tokenSlice } from './tokenSlice';

export const tokenMiddleware = store => next => action => {
  console.log('action: ', action);
  if (action.type === tokenSlice.actions.tokenRequestSuccess) {
    setToken(action.token);
  }
  if (action.type === tokenSlice.actions.deleteToken) {
    console.log('delete'); // Почему не работает?????
    setToken('');
  }
  next(action);
};

export const tokenRequestAsync = (urlToken) => (dispatch, getState) => {
  dispatch(tokenSlice.actions.tokenRequest());
  axios(urlToken, {
    method: 'POST'
  })
    .then(({ data: { access_token: token } }) => {
      console.log(token);
      localStorage.setItem('token', token);
      dispatch(tokenSlice.actions.tokenRequestSuccess({ token }));
    })
    .catch(error =>
      dispatch(tokenSlice.actions.tokenRequestSuccess(error)));
};
