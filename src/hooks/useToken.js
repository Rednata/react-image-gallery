import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { urlAuthToken } from '../api/auth';
import { tokenRequestAsync } from '../store/token/tokenAction';

export const useToken = () => {
  const currentURL = new URL(window.location.href);
  const code = currentURL.searchParams.has('code') ?
    currentURL.searchParams.get('code') : '';
  const urlToken = `${urlAuthToken}&code=${code}`;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!code) return;
    dispatch(tokenRequestAsync(urlToken));
  }, [code]);
};
