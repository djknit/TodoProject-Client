import axios from 'axios';
import { deleteToken, getAuthHeader, saveToken } from './jwt';

/****************************************************************************************/
/* CONFIG ******************************************************************/
let baseUrl = (process.env.BASE_URL || '/');
if (baseUrl[baseUrl.length - 1] !== '/') baseUrl += '/';
baseUrl += 'api';

const noAuthAxios = axios.create({ baseURL: baseUrl });
function makeAuthAxiosInstance() { // make new axios instance each time in case jwt changes, so header gets correct version token
  return axios.create({
    baseURL: baseUrl,
    headers: getAuthHeader()
  });
}

/****************************************************************************************/
/* API CALLS (As methods divided into objects by category) ******************/
const unauthApi = {
  login({ username, password }) {
    return noAuthAxios.post('/authenticate', { username, password })
      .then(res => {
        saveToken(res.data.jwt);
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
  logout() { // (not really API function, but related)
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

/****************************************************************************************/
/* RESPONSE PROCESSING (1st step in chain) **********************************/
let _handleJwtAuthFailure;
function registerUnauthHandler(__handleAuthFail) { // method to redirect to login is registered here by a component able to perform redirect w/ access to the history prop
  _handleJwtAuthFailure = __handleAuthFail;
}

[unauthApi, userApi, todoApi].forEach(apiUtilObj => {
  const isUnrestricted = apiUtilObj === unauthApi;
  for (const methodName in apiUtilObj) {
    apiUtilObj[methodName] = addStandardErrResProcessor(apiUtilObj[methodName], isUnrestricted);
  }
});

function addStandardErrResProcessor(method, isUnrestricted) {
  // take promise object returned by api call and add some processing to promise chain with a ".catch()" before returning it
    // (This is just the first step in the chain and shouldn't affect how the methods are used.)
  return function (...args) {
    const result = method(...args)
      .catch(e => {
        const resData = (e && e.response && e.response.data) || {};
        const message = (
          resData.message ||
          (resData.messages && resData.messages[0]) ||
          'An unknown problem has occured.'
        );
        const messages = resData.messages || [message];
        const status = e && e.response && e.response.status;
        if (status >= 400 && status < 500) messages.push('Please try again.');
        else messages.push('Please try reloading the page or try again later.');
        throw Object.assign(new Error(message), resData, { messages, status });
      });
    return isUnrestricted ? result : result.catch(catchUnauthorized);
  }
}

function catchUnauthorized(err) {
  const status = err && (err.status || (err.response && err.response.status));
  if (status === 401 || status === 403) {
    if (_handleJwtAuthFailure) _handleJwtAuthFailure();
    err.is401 = true;
    throw err;
  }
}

/****************************************************************************************/
/* EXPORTS *******************************************************************/
export { unauthApi, userApi, todoApi, registerUnauthHandler };
