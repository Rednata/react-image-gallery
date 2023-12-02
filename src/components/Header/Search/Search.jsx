import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postsRequestAsync } from '../../../store/posts/postsAction';
import { postsSlice } from '../../../store/posts/postsSlice';

import style from './Search.module.css';

export const Search = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(inputRef.current.value);
  };

  const autofocus = () => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(postsSlice.actions.searchUpdate({ value }));
    dispatch(postsRequestAsync('begin'));
  };

  return (
    <form
      className={style.form}
      onSubmit={submitSearch}
    >
      <input
        className={style.input}
        type="search"
        name="input"
        placeholder="Поиск"
        autoComplete="off"
        ref={inputRef}
        onChange={handleChange}
        value={value}
        onFocus={autofocus}
      />
      <button className={style.button} type="submit" />
    </form>
  );
};