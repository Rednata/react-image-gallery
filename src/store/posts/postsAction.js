/* eslint-disable no-unused-vars */
import axios from 'axios';
import { CLIENT_ID, URL_API } from '../../api/const';
import { postsSlice } from './postsSlice';
import { formatDate } from '../../utils/formatDate';
import { getRandomID } from '../../utils/getRandomKey';
import { loadImg } from '../../UI/loadImg';

export const postsRequestAsync = (begin) => (dispatch, getState) => {
  const page = !begin ? getState().posts.page : 0;
  const token = getState().token.token;

  const search = getState().posts.search;
  const loading = getState().posts.loading;

  if (loading) return;

  const urlPostsRequestHeaders =
    token ? `Bearer ${token}` : `Client-ID ${CLIENT_ID}`;

  dispatch(postsSlice.actions.postsRequest());

  axios(`${URL_API}search/photos?per_page=30&page=${page + 1}&query=${search}`,
    {
      headers: {
        Authorization: urlPostsRequestHeaders
      }
    })
    .then(({ data: { results } }) => {
      const posts = results.map(post => {
        console.log();
        return (
          { img: post.urls.small_s3,
            largeImg: post.urls.regular,
            author: post.user.username,
            linkAuthor: post.user.links.self,
            linkDownload: post.links.download,
            date: formatDate(post.created_at),
            likes: post.likes,
            id: post.id,
            liked: post.liked_by_user,
            altDescript: post.alt_description,
            key: getRandomID(),
          });
      });
      if (begin) {
        dispatch(postsSlice.actions.postsRequestSuccessBegin({ posts }));
      } else {
        dispatch(postsSlice.actions.postsRequestSuccess({ posts }));
      }
    })
    .catch(error => {
      dispatch(postsSlice.actions.postsRequestError({ error }));
    });
};
