/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import style from './UserImg.module.css';
import classNames from 'classnames';
import { useGetPostByID } from '../../hooks/useGetPostByID';
import { ReactComponent as BackIcon } from './img/back.svg';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likedPostRequestAsync } from '../../store/liked/likedAction';

export const UserImg = () => {
  const { id } = useParams();
  const { img, author, date, linkAuthor } = useGetPostByID(id);

  const dispatch = useDispatch();

  const { likes, liked_by_user: liked } = useSelector(state => state.liked.liked);
  console.log('likes: ', likes);
  console.log('liked: ', liked);

  const [like, setLike] = useState(liked);
  const [changeLikes, setChangeLikes] = useState(false);

  const handleClick = () => {
    setLike(!like);
    setChangeLikes(true);
  };

  useEffect(() => {
    if (!changeLikes) return;
    dispatch(likedPostRequestAsync(id, like));
  }, [like]);

  return (
    <div className={style.container}>
      <div className={classNames(style.modal)}>
        <img className={style.img} src={img} alt="" />
        <div className={style.info}>
          <a className={style.author} href={linkAuthor}>{author}</a>
          <p className={style.date} >{date}</p>
          <p className={style.like}>
            <button
              className={ like ? style.like__button_active : style.like__button}
              onClick={handleClick}
            >
              <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.41337 13.8733C8.18671 13.9533 7.81337 13.9533 7.58671 13.8733C5.65337 13.2133 1.33337 10.46 1.33337 5.79332C1.33337 3.73332 2.99337 2.06665 5.04004 2.06665C6.25337 2.06665 7.32671 2.65332 8.00004 3.55998C8.67337 2.65332 9.75337 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41337 13.8733Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {likes}</p>
        </div>
        <a href='/' className={style.back}>
          <BackIcon width={45} height={45} />
        </a>
      </div>
    </div>
  );
};

