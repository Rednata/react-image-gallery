/* eslint-disable no-unused-vars */
import axios from 'axios';
import { URL_API } from '../../api/const';
import { postsSlice } from '../posts/postsSlice';
// import { likedSlice } from './likedSlice';

export const likedPostRequestAsync = (id, methed) => (dispatch, getState) => {
  const method = methed ? 'POST' : 'DELETE';
  const token = getState().token.token;
  const posts = getState().posts.posts;

  // dispatch(likedSlice.actions.likedPostRequest());
  axios(`${URL_API}photos/${id}/like`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(({ data: { photo: data } }) => {
      // dispatch(likedSlice.actions.likedPostRequestSuccess({ data }));
      const { id, liked_by_user: liked, likes } = data;
      console.log('id: ', id);
      console.log('likes: ', likes);
      console.log('liked: ', liked);
      const postIndex = posts.findIndex(post => post.id === id);
      const newPosts = [...posts];
      newPosts[postIndex] = { ...newPosts[postIndex], liked, likes };
      console.log('newPosts: ', newPosts);
      dispatch(postsSlice.actions.postsUpdate({ newPosts }));
    })
    .catch(error => console.log(error));
};
