/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { likedPostRequestAsync } from '../../../../store/liked/likedAction';

import style from './ListItem.module.css';

export const ListItem = ({ data }) => {
  const dispatch = useDispatch();
  const { img, author, date, likes, id, linkAuthor, liked, altDescript } = data;

  const [changeLike, setChangeLike] = useState(0);
  const [imgLike, setImgLike] = useState(undefined);
  const [imgLikeCount, setImgLikeCount] = useState(null);

  const handleClick = () => {
    setChangeLike(changeLike + 1);
    if (imgLike === undefined) {
      setImgLike(!liked);
      setImgLikeCount(liked ? likes - 1 : likes + 1);
    } else {
      setImgLike(!imgLike);
      setImgLikeCount(!imgLike ? imgLikeCount + 1 : imgLikeCount - 1);
    }
  };

  useEffect(() => {
    console.log();
    if (imgLike === undefined) return;
    dispatch(likedPostRequestAsync(id, imgLike));
  }, [changeLike]);

  return (
    <div className={style.item}>
      <Link to={`/images/img/${id}`}>
        <img className={style.img}
          src={img}
          alt={altDescript}
        />
      </Link>
      <div className={style.info}>
        <a className={style.author} href={linkAuthor}>{author}</a>
        <div className={style.wrap}>
          <p className={style.date}>{date}</p>
          <p className={style.like}>
            <button
              className={
                (imgLike === undefined) ?
                  (
                    liked ? style.like__button_active : style.like__button
                  ) : (
                    imgLike ? style.like__button_active : style.like__button
                )
              }
              onClick={handleClick}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.41337 13.8733C8.18671 13.9533 7.81337 13.9533 7.58671 13.8733C5.65337 13.2133 1.33337 10.46 1.33337 5.79332C1.33337 3.73332 2.99337 2.06665 5.04004 2.06665C6.25337 2.06665 7.32671 2.65332 8.00004 3.55998C8.67337 2.65332 9.75337 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41337 13.8733Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {(imgLikeCount === null) ? likes : imgLikeCount}
          </p>
        </div>
      </div>
    </div>);
};

ListItem.propTypes = {
  data: PropTypes.object,
  img: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  likes: PropTypes.number,
  liked: PropTypes.bool,
};
