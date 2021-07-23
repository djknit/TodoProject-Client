import React, { useState } from "react";


function formFactory({ inputs, title, handleSubmit, formName }) {

  const onSubmit = event => {
    event.preventDefault();
    handleSubmit();
  };

  return {
    reset: () => setState(getInitialState(inputs)),
    state: { ...state },
    Form() {
      return Form({ inputs, title, onSubmit, formName });
    }
  };
}


function Form({
  inputs,
  title,
  onSubmit,
  formName,
}) {

  const [ state, setState ] = useState(getInitialState(inputs));
  const [ problemMessages, setProblemMessages ] = useState([]);

  return (
    <form id={formName} onSubmit={onSubmit}>
      {title && (
        <h2>{title}</h2>
      )}
      {(problemMessages && problemMessages.length > 0 ) && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          {problemMessages.map(message => (
            <p key={message}>{message}</p>
          ))}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      {inputs.map(
        ({ name, type, label, placeholder }) => (
          <React.Fragment key={name}>
            {label && (
              <label for={`${formName}_${name}`}>{label}</label>
            )}
            <input
              id={`${formName}_${name}`}
              value={state[name]}
              type={type}
              placeholder={placeholder}
              onChange={({ target }) => setState({ ...state, [name]: target.value })}
            />
          </React.Fragment>
        )
      )}
      <input type="submit">Submit</input>
    </form>
  );
}


function getInitialState(inputs) {
  let initialState = {};
  inputs.forEach(({ name, initialValue }) => {
    initialState[name] = initialValue;
  });
}


export default formFactory;
