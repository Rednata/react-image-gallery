import { useEffect, useState } from 'react';
import { CLIENT_ID, URL_API } from '../api/const';
import { formatDate } from '../utils/formatDate';

export const usePostID = (id) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`${URL_API}photos/${id}`, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`
      }
    })
      .then(response => response.json())
      .then(({ urls, user, created_at: date, likes }) => {
        // console.log(data);
        setPost({
          img: urls.regular,
          author: user.username,
          linkAuthor: user.links.self,
          date: formatDate(date),
          likes,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);
  return post;
};
