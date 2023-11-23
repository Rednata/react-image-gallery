import axios from 'axios';
import { URL_API } from '../../api/const';
import { authSlice } from './authSlice';

export const authRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;

  dispatch(authSlice.actions.authRequest());

  axios(`${URL_API}me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(({ data: { username, profile_image: profileImg } }) => {
      const imgIcon = profileImg.small.replace(/\?.*$/, '');
      const auth = { username, imgIcon };
      dispatch(authSlice.actions.authRequestSuccess({ auth }));
    })
    .catch(error => {
      dispatch(authSlice.actions.authRequestError({ error }));
    });
};

