import React, { useState } from 'react';
import Alert from './Alert';
import './Form.css';

function Form({
  inputs,
  title,
  submit,
  formName
}) {

  const [inputValues, setInputValues] = useState(getInitialInputValues(inputs));
  const [problemMessages, setProblemMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    submit(inputValues)
      .then(result => {
        setIsLoading(false);
        setProblemMessages([]);
      })
      .catch(err => {
        setIsLoading(false);
        setProblemMessages(getErrorMessages(err));
      });
  }

  return (
    <div className="card form-parent">
      <form className="card-body" id={formName} onSubmit={handleSubmit}>
        {title && (
          <h2 className="card-title">{title}</h2>
        )}
        {problemMessages && problemMessages.length > 0 && (
          <Alert messages={problemMessages} />
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
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default Form;



function getInitialInputValues(inputsInfo) {
  let inputValues = {};
  inputsInfo.forEach(({ name, initialValue }) => {
    inputValues[name] = initialValue;
  });
  return inputValues;
}

function getErrorMessages(formError) {
  return [
    'Submission Failed',
    ...(
      (formError && formError.messages) ||
      (formError && formError.message && [formError.message]) || 
      (formError && formError.status !== 500 && ([
        'Your submission was rejected due to invalid input.',
        'Please try again.'
      ])) || ([
        'An unknown problem occured when submitting you input.',
        'Please try reloading the page and trying again'
      ])
    )
  ];
}
