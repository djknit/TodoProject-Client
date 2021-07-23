import { useState } from "react";

function addFormState({
  Component,
  inputs,
  ...props
}) {

  return function FormState({}) {
    const [state, setState] = useState(getInitialState(inputs));
    return (
      <Component
        inputs={inputs}
        {...props}
      />
    );
  };
}

function getInitialState(inputs) {
  let initialState = {};
  inputs.forEach(({ name, initialValue }) => {
    initialState[name] = initialValue;
  });
  return initialState;
}

export default addFormState;
