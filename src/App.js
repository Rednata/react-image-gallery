import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getToken } from './api/token';
import Header from './components/Header';
import Main from './components/Main';
import UserImg from './components/UserImg';
import { tokenSlice } from './store/token/tokenSlice';

export const App = () => {
  const token = getToken();
  const dispatch = useDispatch();
  dispatch(tokenSlice.actions.updateToken({ token }));

  return (
    <Routes>
      <Route path='/' element = {
        <>
          <Header />
          <Main />
        </>
      }>
      </Route>
      <Route path='/images/img/:id' element = {
        <UserImg />
      }>
      </Route>
    </Routes>
  );
};

export default App;
