import { useReducer, useState } from 'react';

const initialState = {
  value: null,
  isTouched: false,
};

const actions = {
  UPDATE_VALUE: 'UPDATE_VALUE',
  UPDATE_TOUCH: 'UPDATE_TOUCH',
  RESET: 'RESET',
};

const inputReducer = (state, action) => {
  switch(action.type) {
    case actions.UPDATE_VALUE:
      return {
        ...state,
        value: action.value,
      };
    case actions.UPDATE_TOUCH:
      return {
        ...state,
        isTouched: action.value,
      };
    case actions.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const useInput = (validator) => {
  //const [enteredValue, setEnteredValue] = useState(null);
  //const [isTouched, setIsTouched] = useState(false);
  const [state, dispatch] = useReducer(inputReducer, initialState);

  const isValid = validator(state.value) ?? false;
  const hasError = !isValid && state.isTouched;

  function valueChangeHandler(event) {
    dispatch({
      type: actions.UPDATE_VALUE,
      value: event.target.value,
    });
    //setEnteredValue(event.target.value);
  }

  function inputBlurHandler(event) {
    //setIsTouched(true);
    dispatch({
      type: actions.UPDATE_TOUCH,
      value: true,
    });
  }

  function reset() {
    // setEnteredValue(null);
    // setIsTouched(false);
    dispatch({
      type: actions.RESET,
    });
  }

  return {
    enteredValue: state.value,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;