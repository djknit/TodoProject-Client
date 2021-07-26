import { useEffect } from 'react';
import Alert from '../components/Alert';
import Form from '../components/Form';
import { FormInputProps, unauthApi, userApi } from '../util';
import './LandingPage.css';

const loginInputs =  [
  new FormInputProps('username', undefined, 'Username', 'Type your username...'),
  new FormInputProps('password', 'password', 'Password', 'Type your password...')
];

function LandingPage({ history }) {

  const goToUserPage = () => history.push('/app/todos');

  useEffect(() => {
    userApi.getCurrentUser()
      .then(goToUserPage) // if no exception thrown, user is already logged in
      .catch(e => {}); // exception is expected
  }, [])

  return (
    <>
      <Alert theme="light" dismissible={false}> 
        <h1 className="display-2">
          <img id="header-logo" src="/logo512.png" alt="ToDo list icon" />
          ToDo List App
        </h1>
      </Alert>
      <Form
        title="Sign In"
        inputs={loginInputs}
        submit={unauthApi.login}
        handleSuccess={goToUserPage}
        formName="login-form"
      />
    </>
  );
}

export default LandingPage;
