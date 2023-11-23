/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import style from './UserImg.module.css';
// import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { usePostID } from '../../hooks/usePostID';
import { ReactComponent as BackIcon } from './img/back.svg';
import { URL_API } from '../../api/const';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const UserImg = () => {

};

export const UserImg1 = () => {
  const { id } = useParams();
  console.log(' id: ', id);
  const { img, author, date, likes, linkAuthor } = usePostID(id);
  const token = useSelector(state => state.token.token);
  console.log('token: ', token);

  const [like, setLike] = useState(false);
  const [classnameBtn, setClassnameBtn] = useState(style.like__button);
  const handleClick = () => {
    setLike(!like);
    setClassnameBtn(style.like__button_active);
  };

  useEffect(() => {
    // if (!token) return;

    try {
      fetch(`${URL_API}photos/${id}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
          // Authorization: `Bearer 7qv5rE7a3LKLU8_2-mSl7KxamH1WpprJ50EH3yO01Xg`
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log('returnData ==', data);
        });
    } catch (error) {
      console.log(error);
    }
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
              className={classnameBtn}
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
    </div>);
};

UserImg.propTypes = {
  data: PropTypes.object,
  img: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  likes: PropTypes.number,
  linkAuthor: PropTypes.string,
};
