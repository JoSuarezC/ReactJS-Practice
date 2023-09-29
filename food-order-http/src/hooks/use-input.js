import { useReducer } from 'react';

const initialState = {
  value: null,
  isTouched: false,
};

const actions = {
  INPUT: 'INPUT',
  BLUR: 'BLUR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.INPUT:
      console.log('state', action)
      return {
        ...state,
        value: action.value,
      };
    case actions.BLUR:
      return {
        ...state,
        isTouched: action.value,
      };
    default:
      return state;
  }
};

const useInput = (validators) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('updated value', state.value)
  const isValid = validators.reduce(
    (prev, current) => {
      console.log(current)
      return prev && current(state.value)
    },
    true
  );
  const showError = !isValid && state.isTouched;

  function valueChangeHandler(event) {
    dispatch({
      type: actions.INPUT,
      value: event.target.value,
    });
  }

  function inputBlurHandler(event) {
    dispatch({
      type: actions.BLUR,
      value: true,
    });
  }

  return {
    value: state.value,
    handleChange: valueChangeHandler,
    handleBlur: inputBlurHandler,
    isValid,
    showError,
  };
};

export default useInput;
