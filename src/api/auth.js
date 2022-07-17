import config from 'config/keys';
import { callGet } from 'utils/requests';

const { serverDomain } = config;
const auth = `${serverDomain}/api/auth`;

const getUser = () => {
  return callGet(`${auth}/user`);
};

const login = async (credentials) => {
  return fetch(`${auth}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
    mode: 'cors'
  });
};

const signUp = async (credentials) => {
  return fetch(`${auth}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
    mode: 'cors'
  });
};

const logout = async () => callGet(`${auth}/logout`);

export default { login, signUp, logout, getUser };
