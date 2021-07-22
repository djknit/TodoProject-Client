import formFactory from '../components/formFactory';
import { FormInputProps } from '../util';

const loginInputs =  [
  new FormInputProps('username', undefined, 'Username', 'Type your username...'),
  new FormInputProps('password', 'password', 'Password', 'Type your password...')
];

function LandingPage({ }) {

  const {
    Form, reset
  } = formFactory({
    inputs: loginInputs,
    title: 'Sign In',
    handleSubmit: state => {
      // validate?
      // submit (call api)
      // update front-end and reset form and redirect to user page or show error message
    },
    formName: 'login-form'
  });

  return (
    <>
      <Form />
    </>
  );
}

export default LandingPage;
