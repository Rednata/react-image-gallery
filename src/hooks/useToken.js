import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { urlAuthToken } from '../api/auth';
import { tokenRequestAsync } from '../store/token/tokenAction';

export const useToken = () => {
  const token = useSelector(state => state.token.token);

  const currentURL = new URL(window.location.href);
  const code = currentURL.searchParams.has('code') ?
    currentURL.searchParams.get('code') : '';
  const urlToken = `${urlAuthToken}&code=${code}`;
  const dispatch = useDispatch();

  useEffect(() => {
    if (token || !code) return;

    dispatch(tokenRequestAsync(urlToken));
  }, [code]);
};
