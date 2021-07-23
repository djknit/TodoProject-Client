import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AppFooter from './components/AppFooter';
import CreateAccount from './views/CreateAccount';
import LandingPage from './views/LandingPage';
import MainApp from './views/MainApp';
import NotFound from './views/NotFound';


const FOOTER_HEIGHT = '3rem';
const CONTAINER_STYLE = { minHeight: `calc(100vh - ${FOOTER_HEIGHT})` };


function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // test authentication and redirect to dashboard if logged in
  }, []);

  return (
    <>
      <div className="App container" style={CONTAINER_STYLE}>
        <Router>
          <Switch>
            <Route path="/app" component={MainApp} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/new-user" component={CreateAccount} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
      <AppFooter height={FOOTER_HEIGHT} />
    </>
  );
}


export default App;
