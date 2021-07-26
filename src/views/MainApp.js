/* * * * * * * * * * * * * * * * * * *
ABOUT THIS FILE:
  This React component is the view shown when the user is signed in.
  All parts of the app except for the login and create-account forms will use this page.
  This page will show the navbar w/ user menu and then the rest of the page will change depending on the page subpath.
    (React Router "Switch" statement is used to configure subroutes.)
* * * * * * * * * * * * * * * * * * */

import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import TodosPage from './TodosPage';
import UpdateAccount from './UpdateAccount';
import Navbar from '../components/Navbar';
import NotFound from './NotFound';
import { registerUnauthHandler } from '../util';

function MainApp({ history }) {

  const [userInfo, setUserInfo] = useState(null);
  const [todoItems, setTodoItems] = useState(null);

  const goHome = () => history.push('/');

  useEffect(() => {
    registerUnauthHandler(goHome);
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route
          path="/todos"
          render={props => (
            <TodosPage {...props} {...{ userInfo, todoItems, setTodoItems }} />
          )}
        />
        <Route
          path="/edit-account"
          render={props => (
            <UpdateAccount {...props} {...{ userInfo, setUserInfo }} />
          )}
        />
        <Route
          render={props => (
            <NotFound {...props} isSignedIn />
          )}
        />
      </Switch>
    </>
  );
}

export default MainApp;
