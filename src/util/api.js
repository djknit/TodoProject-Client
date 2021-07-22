import axios from 'axios';

// need: generic api calls
// base path(s)

// error/bad result status handling

// question: how is the front-end data updated once the server has responded following a successful operation?

// need authentication route, a place to keep the JWT, and authentication header or generic request using the header

const apiAxios = axios.create({ baseURL: '/api/' });

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

function storeJwt(jwt) {
  window.sessionStorage.setItem('t', jwt);
}