import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AppFooter from './components/AppFooter';
import CreateAccount from './views/CreateAccount';
import LandingPage from './views/LandingPage';
import TodosPage from './views/TodosPage';
import UpdateAccount from './views/UpdateAccount';


const FOOTER_HEIGHT = '3rem';
const CONTAINER_STYLE = { minHeight: `calc(100vh - ${FOOTER_HEIGHT})` };


function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <>
      <div className="App container" style={CONTAINER_STYLE}>
        <Router>
          <Switch>
            <Route
              path="/app"
              render={props => (
                <Switch>
                  <Route path="/todos" component={TodosPage} />
                  <Route path="/edit-account" component={UpdateAccount} />
                </Switch>
              )}
            />
            <Route exact path="/" component={LandingPage} {...props} />
            <Route path="/new-user" component={CreateAccount} {...props} />
            <Route  />
          </Switch>
        </Router>
      </div>
      <AppFooter height={FOOTER_HEIGHT} />
    </>
  );
}


export default App;
