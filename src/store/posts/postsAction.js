import axios from 'axios';
import { CLIENT_ID, URL_API } from '../../api/const';
import { postsSlice } from './postsSlice';
import { formatDate } from '../../utils/formatDate';
import { getRandomID } from '../../utils/getRandomKey';

export const postsRequestAsync = () => (dispatch, getState) => {
  const page = getState().posts.page;
  const loading = getState().posts.loading;

  if (loading) return;

  dispatch(postsSlice.actions.postsRequest());

  axios(`${URL_API}photos?&per_page=30&page=${page + 1}`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID}`
    }
  })
    .then(({ data }) => {
      console.log('data: ', data);
      const posts = data.map(post => {
        console.log();
        return (
          { img: post.urls.small_s3,
            largeImg: post.urls.regular,
            author: post.user.username,
            linkAuthor: post.user.links.self,
            linkDownload: post.links.download,
            date: formatDate(post.created_at),
            likes: post.likes,
            idImg: post.id,
            liked: post.liked_by_user,
            altDescript: post.alt_description,
            id: getRandomID(),
          });
      });
      dispatch(postsSlice.actions.postsRequestSuccess({ posts }));
    })
    .catch(error => {
      dispatch(postsSlice.actions.postsRequestError(error));
    });
};
