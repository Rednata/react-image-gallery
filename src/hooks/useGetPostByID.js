import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { URL_API } from '../api/const';
import { formatDate } from '../utils/formatDate';

export const useGetPostByID = (id) => {
  const token = useSelector(state => state.token.token);
  const [post, setPost] = useState({});

  useEffect(() => {
    axios(`${URL_API}/photos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        setPost({
          img: data.links.download,
          // img: data.links.download_location,
          date: formatDate(data.created_at),
          likes: data.likes,
          liked: data.liked_by_user,
          linkAuthor: data.user.links.self,
          author: data.user.name,
          descript: data.description,
        });
      })
      .catch(error => console.log(error));
  }, [id]);
  return post;
};
