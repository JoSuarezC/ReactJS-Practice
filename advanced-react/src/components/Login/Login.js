import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const ON_INPUT = 'ON_INPUT';
const ON_BLUR = 'ON_BLUR';

const emailReducer = (state, action) => {
  switch(action.type) {
    case ON_INPUT:
      return {
        value: action.value,
        isValid: action.value.includes('@'),
      };
    case ON_BLUR:
      return {
        ...state,
        isValid: state.value.includes('@'),
      };
    default:
      return {
        value: '',
        isValid: null,
      };
  }
};

const passwordReducer = (state, action) => {
  switch(action.type) {
    case ON_INPUT:
      return {
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    case ON_BLUR:
      return {
        ...state,
        isValid: state.value.trim().length > 6,
      };
    default:
      return {
        value: '',
        isValid: null,
      };
  }
};

const Login = (props) => {
  const ctx = useContext(AuthContext);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('running')
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('cleaning')
      clearTimeout(timer)
    };
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: ON_INPUT,
      value: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: ON_INPUT,
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({
      type: ON_BLUR,
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: ON_BLUR,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          id="email"
          type="email"
          label="E-Mail"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordRef}
          id="password"
          type="password"
          label="Password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
