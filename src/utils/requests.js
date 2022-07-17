const includeCreds = {
  credentials: 'include',
  mode: 'cors'
};

const callGet = async (url) => {
  return fetch(url, {
    ...includeCreds
  });
};

const callDelete = async (url) => {
  return fetch(url, {
    method: 'DELETE',
    ...includeCreds
  });
};

const modifyResource = async (url, body, method) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    ...includeCreds
  });
};

const callPost = async (url, body) => modifyResource(url, body, 'POST');
const callPatch = async (url, body) => modifyResource(url, body, 'PATCH');
const callPut = async (url, body) => modifyResource(url, body, 'PUT');

export { callGet, callPost, callPut, callPatch, callDelete };
