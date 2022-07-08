import config from 'config/keys';

const { serverDomain } = config;
const auth = `${serverDomain}/api/auth`;

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

export default { login };
