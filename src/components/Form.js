import React, { useState } from 'react';
import Alert from './Alert';
import './Form.css';

function Form({
  inputs,
  title,
  submit,
  handleSuccess,
  formName
}) {

  const [inputValues, setInputValues] = useState(getInitialInputValues(inputs));
  const [problemMessages, setProblemMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    submit(inputValues)
      .then(result => {
        console.log('win:  ', result)
        setIsLoading(false);
        setProblemMessages([]);
        setIsAlertDismissed(false);
        handleSuccess(result);
      })
      .catch(err => {
        setIsLoading(false);
        setProblemMessages(err.messages); // should be guaranteed to exist by initial error processing in api util
        setIsAlertDismissed(false);
      });
  }

  return (
    <div className="card form-parent">
      <form className="card-body" id={formName} onSubmit={handleSubmit}>
        {title && (
          <h2 className="card-title mb-3">{title}</h2>
        )}
        {problemMessages && problemMessages.length > 0 && (
          <Alert
            title="Submission Failed"
            messages={problemMessages}
            isDismissed={isAlertDismissed}
            dismiss={() => setIsAlertDismissed(true)}
          />
        )}
        {inputs.map(
          ({ name, type, label, placeholder }) => (
            <div key={name} className="mb-4 my-field-wrapper">
              {label && (
                <label htmlFor={`${formName}_${name}`} className="form-label">
                  {label}
                </label>
              )}
              <input
                id={`${formName}_${name}`}
                value={inputValues[name]}
                type={type}
                placeholder={placeholder}
                onChange={({ target }) => setInputValues({ ...inputValues, [name]: target.value })}
                disabled={isLoading}
                className="form-control"
              />
            </div>
          )
        )}
        <input type="submit" value="Submit" className="btn btn-primary" disabled={isLoading} />
      </form>
    </div>
  );
}

export default Form;


function getInitialInputValues(inputsInfo) {
  let inputValues = {};
  inputsInfo.forEach(({ name, initialValue = '' }) => {
    inputValues[name] = initialValue;
  });
  return inputValues;
}
