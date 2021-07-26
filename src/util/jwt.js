const TOKEN_PROP_NAME = 'my_jwtoken';

function saveToken(jwt) {
  window.sessionStorage.setItem(TOKEN_PROP_NAME, jwt);
}

function retrieveToken() {
  return window.sessionStorage.getItem(TOKEN_PROP_NAME);
}

function deleteToken() {
  window.sessionStorage.removeItem(TOKEN_PROP_NAME);
}

function getAuthHeader() {
  return { Authorization: 'Bearer ' + retrieveToken() };
}

export {
  saveToken,
  deleteToken,
  getAuthHeader
};
