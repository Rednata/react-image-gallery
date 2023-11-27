
import style from './List.module.css';
import ListItem from '../List/ListItem';
import Masonry from 'react-masonry-css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRequestAsync } from '../../../store/posts/postsAction';

export const List = () => {
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1
  };
  const endList = useRef(null);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  useEffect(() => {
    if (!posts) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargin: '50px'
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
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={style.myMasonryGrid}
        columnClassName={style.myMasonryGrid_column}
      >
        { !posts ? <p> LOADING....</p> :
          posts.map(data => (
            <ListItem
              data={data}
              key={data.key}
            >
            </ListItem>
          ))
        }
      </Masonry>
      <div ref={endList} className={style.endlist}></div>
    </>

  );
};
