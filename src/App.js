import { useDispatch } from 'react-redux';
import { getToken } from './api/token';
import { Header } from './components/Header/Header';
import { tokenSlice } from './store/token/tokenSlice';

export const App = () => {
  const token = getToken();
  const dispatch = useDispatch();
  dispatch(tokenSlice.actions.updateToken({ token }));

  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default App;
