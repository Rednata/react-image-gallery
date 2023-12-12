/* eslint-disable no-unused-vars */

import style from './List.module.css';
import ListItem from '../List/ListItem';
import Masonry from 'react-masonry-css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequestAsync } from '../../../store/posts/postsAction';
import { Loader } from '../../../UI/Loader';
import { useNavigate } from 'react-router-dom';

export const List = () => {
  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1
  };
  const endList = useRef(null);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  // Promise.all(
  //   posts.map(loadImg)
  // )
  //   .then(data => console.log(data));

  // const errorPage = useSelector(state => state.posts.error);
  // if (errorPage.response.status === 403 ||
  //   errorPage === undefined) {
  //   navigate('/error');
  // }

  useEffect(() => {
    if (!posts) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargin: '10px'
    });
    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  return (
    <>
      { !posts.length ? <Loader /> :
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={style.myMasonryGrid}
          columnClassName={style.myMasonryGrid_column}
        >
          {posts.map(data => (
            <ListItem
              data={data}
              key={data.key}
            >
            </ListItem>
          ))}
        </Masonry>
      }
      <div ref={endList} className={style.endlist}></div>
    </>

  );
};
