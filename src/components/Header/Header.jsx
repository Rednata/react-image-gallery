import style from './Header.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Auth from './Auth';

export const Header = () => {
  console.log();
  return (
    <header className={classNames(style.header, style.container)}>
      <h1 className={style.title}>Image-Gallery</h1>
      <Auth />
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string,
};
