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
  return (
    <>
      <div className="App container" style={CONTAINER_STYLE}>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/new-user" component={CreateAccount} />
            <Route path="/todos" component={TodosPage} />
            <Route path="/edit-account" component={UpdateAccount} />
          </Switch>
        </Router>
      </div>
      <AppFooter height={FOOTER_HEIGHT} />
    </>
  );
}


export default App;
