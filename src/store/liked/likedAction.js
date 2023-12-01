/* eslint-disable no-unused-vars */
import axios from 'axios';
import { URL_API } from '../../api/const';
import { postsSlice } from '../posts/postsSlice';

export const likedPostRequestAsync = (id, methed) => (dispatch, getState) => {
  const method = methed ? 'POST' : 'DELETE';
  const token = getState().token.token;
  const posts = getState().posts.posts;

  axios(`${URL_API}photos/${id}/like`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(({ data: { photo: data } }) => {
      const { id, liked_by_user: liked, likes } = data;
      const postIndex = posts.findIndex(post => post.id === id);
      const newPosts = [...posts];
      newPosts[postIndex] = { ...newPosts[postIndex], liked, likes };
      dispatch(postsSlice.actions.postsUpdate({ newPosts }));
    })
    .catch(error => console.log(error));
};
