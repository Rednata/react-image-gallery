/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import style from './UserImg.module.css';
import classNames from 'classnames';
import { ReactComponent as BackIcon } from './img/back.svg';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likedPostRequestAsync } from '../../store/liked/likedAction';
import Auth from '../Header/Auth';
import { URL_API } from '../../api/const';
import { getPostByID } from '../../utils/getPostByID';
import { postsRequestAsync } from '../../store/posts/postsAction';

export const UserImg = () => {
  const { id } = useParams();

  const auth = useSelector(state => state.auth.auth);
  const token = useSelector(state => state.token.token);

  const posts = useSelector(state => state.posts.posts);
  const { img, author, date, linkAuthor, likes, liked } = getPostByID(posts, id);

  const [pageLike, setPageLike] = useState(undefined);
  const [pageLikeCount, setPageLikeCount] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [changeLikes, setChangeLikes] = useState(0);

  const handleClick = () => {
    setChangeLikes(changeLikes + 1);
    if (pageLike === undefined) {
      setPageLike(!liked);
    } else {
      setPageLike(!pageLike);
    }
    if (pageLikeCount === null) {
      if (liked) {
        setPageLikeCount(likes - 1);
      } else {
        setPageLikeCount(likes + 1);
      }
    } else {
      if (pageLike) {
        setPageLikeCount(pageLikeCount - 1);
      } else {
        setPageLikeCount(pageLikeCount + 1);
      }
    }
  };

  const handleBackBtnClick = () => {
    navigate('/');
    dispatch(likedPostRequestAsync(id, (pageLike !== undefined) ? pageLike : liked));
    console.log('pageLike: ', pageLike);
    console.log('liked: ', liked);
    dispatch(postsRequestAsync('begin'));
  };

  const [download, setDownload] = useState(0);

  const refImg = useRef(null);

  useEffect(() => {
    if (!download) return;

    fetch(`${URL_API}photos/${id}/download`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.blob())
      .then(blob => {
        console.log(blob);
        refImg.current.src = URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = URL.createObjectURL(blob);
        // link.download = 'img1';
        // link.click();
      })
      .catch(error => console.log(error));
  }, [download]);

  return (
    <div className={style.container}>
      {auth.username ?
          (
          <div className={classNames(style.modal)}>
            <img className={style.img} src={img} alt="" />
            <div className={style.info}>
              <a className={style.author} href={linkAuthor}>{author}</a>
              <p className={style.date} >{date}</p>
              <p className={style.like}>
                <button
                  className={
                    (pageLike === undefined) ?
                      (
                        liked ? style.like__button_active : style.like__button
                      ) : (
                        pageLike ? style.like__button_active : style.like__button
                    )
                  }
                  onClick={handleClick}
                >
                  <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.41337 13.8733C8.18671 13.9533 7.81337 13.9533 7.58671 13.8733C5.65337 13.2133 1.33337 10.46 1.33337 5.79332C1.33337 3.73332 2.99337 2.06665 5.04004 2.06665C6.25337 2.06665 7.32671 2.65332 8.00004 3.55998C8.67337 2.65332 9.75337 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41337 13.8733Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {(pageLikeCount === null) ? likes : pageLikeCount}</p>
            </div>
            <button
              className={style.back}
              onClick={handleBackBtnClick}
            >
              <BackIcon width={45} height={45} />
            </button>

            <button
              className={style.download}
              onClick={() => setDownload(download + 1)}
            >
              Download
            </button>
            <img ref={refImg} src="" alt="" />
          </div>
          ) : (
          <>
            <p className={style.textError}>Пожалуйста, авторизуйтесь для просмотра фотографий</p>
            <div className={style.btnAuthWrap}>
              <Auth />
            </div>
          </>
          )
      }
    </div>
  );
};

