import React, { useState } from "react";


function formFactory({ inputs, title, handleSubmit, formName }) {

  const [ state, setState ] = useState(getInitialState(inputs));

  const onSubmit = event => {
    event.preventDefault();
    handleSubmit(state);
  };

  return {
    reset: () => setState(getInitialState(inputs)),
    state: { ...state },
    Form() {
      return Form({ inputs, title, onSubmit, formName, state, setState });
    }
  };
}


function Form({
  inputs,
  title,
  onSubmit,
  formName,
  state,
  setState
}) {

  return (
    <form id={formName} onSubmit={onSubmit}>
      {title && (
        <h2>{title}</h2>
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
