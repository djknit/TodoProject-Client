/* * * * * * * * * * * * * * * * * * *
ABOUT THIS FILE:
  This React component is the view shown when the user is signed in.
  All parts of the app except for the login and create-account forms will use this page.
  This page will show the navbar w/ user menu and then the rest of the page will change depending on the page subpath.
    (React Router "Switch" statement is used to configure subroutes.)
* * * * * * * * * * * * * * * * * * */

import { useState } from 'react';
import { Switch, Route } from 'react-router';
import TodosPage from './TodosPage';
import UpdateAccount from './UpdateAccount';
import Navbar from '../components/Navbar';
import NotFound from './NotFound';

function MainApp({}) {

  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [todoItems, setTodoItems] = useState(null);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/todos" component={TodosPage} />
        <Route path="/edit-account" component={UpdateAccount} />
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
