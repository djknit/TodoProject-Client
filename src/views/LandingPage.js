import Alert from '../components/Alert';
import Form from '../components/Form';
import { FormInputProps } from '../util';
import './LandingPage.css';

const loginInputs =  [
  new FormInputProps('username', undefined, 'Username', 'Type your username...'),
  new FormInputProps('password', 'password', 'Password', 'Type your password...')
];

function LandingPage({  }) {
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
        submit={formData => {
          // validate?
          // submit (call api)
          // update front-end and reset form and redirect to user page or show error message
        }}
        formName="login-form"
      />
    </>
  );
}

export default LandingPage;
