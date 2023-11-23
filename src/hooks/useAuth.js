import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRequestAsync } from '../store/auth/authAction';
import { likedRequestAsync } from '../store/liked/likedAction';

export const useAuth = () => {
  const token = useSelector(state => state.token.token);
  const auth = useSelector(state => state.auth.auth);
  const liked = useSelector(state => state.auth.liked);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(authRequestAsync());
  }, [token]);

  useEffect(() => {
    if (!token) return;

    dispatch(likedRequestAsync());
  }, [token]);
  return { auth, liked };
};
