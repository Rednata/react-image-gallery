import axios from 'axios';
import { URL_API } from '../../api/const';
import { likedSlice } from './likedSlice';

export const likedRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;
  const auth = getState().auth.auth;

  if (!auth.username) return;

  dispatch(likedSlice.actions.likedRequest());

  axios(`${URL_API}users/${auth.username}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(({ data }) => {
      console.log('dataLIKED', data);
      dispatch(likedSlice.actions.likedRequestSuccess({ data }));
    })
    .catch(error => dispatch(likedSlice.actions.likedRequestError({ error })));
};

