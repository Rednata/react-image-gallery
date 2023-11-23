export const setToken = (token) => {
  console.log('token: ', token);
  localStorage.setItem('token', token);
};

export const getToken = () => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  return token;
};
