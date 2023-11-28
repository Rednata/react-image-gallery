/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../api/const';
import { likedSlice } from '../store/liked/likedSlice';
import { formatDate } from '../utils/formatDate';

export const useGetPostByID = (id) => {
  const [post, setPost] = useState({});
  const token = useSelector(state => state.token.token);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${URL_API}photos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(({ urls, user, created_at: date, likes, liked_by_user: liked }) => {
        setPost({
          img: urls.regular,
          author: user.username,
          linkAuthor: user.links.self,
          date: formatDate(date),
          likes,
          liked,
        });
        const data = { likes, liked };
        dispatch(likedSlice.actions.updatePostLiked({ data }));
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);
  return post;
};
