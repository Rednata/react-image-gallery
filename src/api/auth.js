import {
  URL_AUTH_TOKEN,
  URL_AUTH,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  CLIENT_ID,
  CLIENT_SECRET,
  GRANT_TYPE,
} from './const';

const params = new URLSearchParams({
  redirect_uri: REDIRECT_URI,
  response_type: RESPONSE_TYPE,
  scope: SCOPE,
  client_id: CLIENT_ID,
});

const paramsToken = new URLSearchParams({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  grant_type: GRANT_TYPE,
});

export const urlAuthCode = `${URL_AUTH}${params}`;
export const urlAuthToken = `${URL_AUTH_TOKEN}${paramsToken}`;
