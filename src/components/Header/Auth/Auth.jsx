/* eslint-disable no-unused-vars */
import { urlAuthCode } from '../../../api/auth';
import { useToken } from '../../../hooks/useToken';
import style from './Auth.module.css';

import { useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../../store/auth/authSlice';
import { tokenSlice } from '../../../store/token/tokenSlice';
import { postsRequestAsync } from '../../../store/posts/postsAction';

export const Auth = () => {
  useToken();
  const { auth } = useAuth();
  const dispatch = useDispatch();

  const [outBtn, setOutBtn] = useState(false);

  const getOut = () => {
    dispatch(authSlice.actions.clearAuth());
    dispatch(tokenSlice.actions.deleteToken());
    dispatch(postsRequestAsync('begin'));
  };

  return (
    auth.username ?
      <div
        className={style.wrap}
        onClick={() => setOutBtn(!outBtn)}>
        <img
          className={style.img}
          src={auth.imgIcon}
          alt={`Аватар ${auth.username}`}
        />
        <span className={style.name}>{auth.username}</span>
        {outBtn &&
          <button className={style.btn_logout} onClick={getOut}>Logout</button>
        }
      </div> :
      <a
        className={style.link}
        href={urlAuthCode}
      >
      LogIn</a>
  );
};


