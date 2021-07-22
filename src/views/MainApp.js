/* * * * * * * * * * * * * * * * * * *
ABOUT THIS FILE:
  This React component is the view shown when the user is signed in.
  All parts of the app except for the login and create-account forms will use this page.
  This page will show the navbar w/ user menu and then the rest of the page will change depending on the page subpath.
    (React Router "Switch" statement is used to configure subroutes.)
* * * * * * * * * * * * * * * * * * */

import { useState } from 'react';
import { Switch } from 'react-router';

function MainApp({}) {

  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [todoItems, setTodoItems] = useState(null);

  return (
    <>
      <Switch>
        <Route path="/todos" component={TodosPage} />
        <Route path="/edit-account" component={UpdateAccount} />
      </Switch>
    </>
  );
}
