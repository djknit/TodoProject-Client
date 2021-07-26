const TOKEN_PROP_NAME = 'my_jwtoken';

function saveToken(jwt) {
  console.log('save token to sess store')
  console.log('jwt: "' + jwt + '"')
  window.sessionStorage.setItem(TOKEN_PROP_NAME, jwt);
}

function retrieveToken() {
  console.log('retrieve token from sess')
  return window.sessionStorage.getItem(TOKEN_PROP_NAME);
}

function deleteToken() {
  window.sessionStorage.removeItem(TOKEN_PROP_NAME);
}

function getAuthHeader() {
  console.log({ Authorization: 'Bearer ' + retrieveToken() })
  return { Authorization: 'Bearer ' + retrieveToken() };
}

export {
  saveToken,
  // retrieveToken,
  deleteToken,
  getAuthHeader
};
