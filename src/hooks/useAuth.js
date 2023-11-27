import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRequestAsync } from '../store/auth/authAction';
// import { likedRequestAsync } from '../store/liked/likedAction';
import { postsRequestAsync } from '../store/posts/postsAction';

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
    dispatch(postsRequestAsync());
  }, [auth]);
  return { auth, liked };
};
