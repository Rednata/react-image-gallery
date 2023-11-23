import { urlAuthCode } from '../../../api/auth';
import { useToken } from '../../../hooks/useToken';
import style from './Auth.module.css';

import { useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../../store/auth/authSlice';
import { tokenSlice } from '../../../store/token/tokenSlice';
// import iconLogin from './img/login.svg';

export const Auth = () => {
  // const token = useSelector(state => state.token.token);
  const token = useToken();
  const auth = useAuth();
  const dispatch = useDispatch();

  console.log('token: ', token);
  console.log('auth: ', auth);

  const [outBtn, setOutBtn] = useState(false);

  const getOut = () => {
    console.log('out');
    dispatch(authSlice.actions.clearAuth());
    dispatch(tokenSlice.actions.deleteToken());
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
          <button onClick={getOut}>Logout</button>
        }
      </div> :
      <a
        className={style.link}
        href={urlAuthCode}
      >
      LogIn</a>
  );
};

// return (
//   <div
//     className={style.wrap}>
//     {
//       auth.username ?
//       <>
//         <img
//           className={style.img}
//           src={auth.imgIcon}
//           alt={`Аватар ${auth.username}`}
//         />
//         <span className={style.name}>{auth.username}</span>
//       </> :
//       <a
//         className={style.link}
//         href={urlAuthCode}
//       >
//       LogIn</a>
//     }
// {/* <img className={style.img} src={iconLogin} alt="Аватар" /> */}

// </div>
{/* <> */}
{/* {auth ?
      <div className={style.wrap}>
        <img
          className={style.img}
          src={auth.imgIcon}
          alt={`Аватар ${auth.username}`}
        />
        <span className={style.name}>{auth.username}</span>
        {/* <button className={style.btn}>LogOut</button> */}
{/* </div> :
      (<a
        className={style.link}
        href={urlAuthCode}
      >
        LogIn</a>)
      }
    </> */}

