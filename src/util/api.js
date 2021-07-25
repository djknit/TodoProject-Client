import axios from 'axios';
import { deleteToken, getAuthHeader, saveToken } from './jwt';

// need: generic api calls
// base path(s)

// error/bad result status handling

// question: how is the front-end data updated once the server has responded following a successful operation?
  // ^ answer: promise returned by api util method is resolved w/ relavent data

let baseUrl = (process.env.BASE_URL || '/');
if (baseUrl[baseUrl.length - 1] !== '/') baseUrl += '/';
baseUrl += 'api';

const noAuthAxios = axios.create({ baseURL: baseUrl });
function makeAuthAxiosInstance() {
  return axios.create({
    baseURL: baseUrl,
    headers: getAuthHeader()
  });
}

const unauthApi = {
  login({ username, password }) {
    return noAuthAxios.post('/authenticate', { username, password })
      .then(res => {
        saveToken(res.jwt);
      });
  },
  createUser({ username, password, firstName, lastName }) {
    return noAuthAxios.post('/user', { username, password, firstName, lastName })
  }
};

const userSubpath = '/user';
const userApi = {
  getCurrentUser() {
    return makeAuthAxiosInstance().get(userSubpath);
  },
  updateUserInfo({ username, password, firstName, lastName }) {
    return makeAuthAxiosInstance()
      .put(userSubpath, { username, password, firstName, lastName });
  },
  logout() { // <- this method s pretty pointless right now
    // (not really API function. just need to delete jwt from session storage and redirect to login page.)
    deleteToken();
  },
};

const todoSubpath = '/todo';
const getSubTodoPath = subpath => `${todoSubpath}/${subpath}`;
const updateTodoPath = getSubTodoPath('update');
const todoApi = {
  getUserTodos() {
    return makeAuthAxiosInstance().get(todoSubpath);
  },
  createTodo({ description, dueDate, ...otherProps }) {
    return makeAuthAxiosInstance()
      .post(getSubTodoPath('create'), { description, dueDate, ...otherProps });
  },
  editTodo({ id, description, completed, dueDate, ...otherProps}) {
    return makeAuthAxiosInstance().put(
      updateTodoPath,
      { id, description, completed, dueDate, ...otherProps }
    );
  },
  editDescription({ id, description }) {
    return makeAuthAxiosInstance().patch(`${updateTodoPath}/description`, { id, description });
  },
  markComplete({ id, completed }) {
    return makeAuthAxiosInstance().patch(`${updateTodoPath}/completed`, { id, completed });
  },
  deleteItem({ id }) {
    return makeAuthAxiosInstance().delete(`${getSubTodoPath('delete')}/${id}`)
  }
};

export { unauthApi, userApi, todoApi };
