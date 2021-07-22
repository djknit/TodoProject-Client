import axios from 'axios';

// need: generic api calls
// base path(s)

// error/bad result status handling

// question: how is the front-end data updated once the server has responded following a successful operation?

// need authentication route, a place to keep the JWT, and authentication header or generic request using the header

const userApi = {
  login() {
    
  },
  createUser() {

  },
  updateUserInfo() {

  },
  logout() {

  },
};


const JWT_PROP_NAME = 'user_token';
function storeJwt(jwt) {
  window.sessionStorage.setItem(JWT_PROP_NAME, jwt);
}
function getAuthHeader() {
  return { Authorization: window.sessionStorage.getItem(JWT_PROP_NAME) };
}
