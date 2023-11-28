/* eslint-disable no-unused-vars */
import axios from 'axios';
import { URL_API } from '../../api/const';
import { likedSlice } from './likedSlice';

export const likedPostRequestAsync = (id, methed) => (dispatch, getState) => {
  const method = methed ? 'POST' : 'DELETE';
  const token = getState().token.token;
  const posts = getState().posts.posts;

  dispatch(likedSlice.actions.likedPostRequest());
  axios(`${URL_API}photos/${id}/like`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(({ data: { photo } }) => {
      dispatch(likedSlice.actions.likedPostRequestSuccess({ photo }));
      const data = { likes: photo.likes, liked: photo.liked_by_user };
      dispatch(likedSlice.actions.updatePostLiked({ data }));
    })
    .catch(error => console.log(error));
};
