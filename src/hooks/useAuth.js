import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRequestAsync } from '../store/auth/authAction';

export const useAuth = () => {
  const token = useSelector(state => state.token.token);
  const auth = useSelector(state => state.auth.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(authRequestAsync());
  }, [token]);
  return auth;
};
