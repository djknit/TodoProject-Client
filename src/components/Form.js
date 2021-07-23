import React, { useState } from 'react';
import Alert from './Alert';

function Form({
  inputs,
  title,
  submit,
  formName
}) {

  const [inputValues, setInputValues] = useState(getInitialInputValues(inputs));
  const [problemMessages, setProblemMessages] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    submit(inputValues);
  }

  return (
    <form id={formName} onSubmit={handleSubmit}>
      {title && (
        <h2>{title}</h2>
      )}
      <Alert messages={problemMessages} />
      {inputs.map(
        ({ name, type, label, placeholder }) => (
          <React.Fragment key={name}>
            {label && (
              <label for={`${formName}_${name}`}>{label}</label>
            )}
            <input
              id={`${formName}_${name}`}
              value={inputValues[name]}
              type={type}
              placeholder={placeholder}
              onChange={({ target }) => setInputValues({ ...inputValues, [name]: target.value })}
            />
          </React.Fragment>
        )
      )}
      <input type="submit">Submit</input>
    </form>
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
