import { urlAuthCode } from '../../../api/auth';
import { useSelector } from 'react-redux';
import style from './Auth.module.css';
import { useToken } from '../../../hooks/useToken';
// import iconLogin from './img/login.svg';

export const Auth = () => {
  const token = useSelector(state => state.token.token);

  console.log('token: ', token);

  return (
    <div className={style.wrap}>
      {/* <img className={style.img} src={iconLogin} alt="Аватар" /> */}
      <a
        className={style.link}
        href={urlAuthCode}
        onClick={() => useToken()}
      >
        LogIn</a>
    </div>
  );
};

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

