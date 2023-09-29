import React, { useEffect, useRef } from 'react';
import Form from '../UI/Form';
import InputForm from '../UI/InputForm';
import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../constants';

const validators = {
  isEmpty: (value) => value && value.trim() !== '',
  isNumber: (value) => value && !isNaN(value),
};

export const Checkout = ({ onCancel }) => {
  const { isLoading, error, sendRequest } = useHttp();
  const httpErrorRef = useRef();
  const {
    value: nameValue,
    handleChange: onNameChange,
    handleBlur: onNameBlur,
    isValid: nameIsValid,
    showError: showNameError,
  } = useInput([validators.isEmpty]);
  const {
    value: cityValue,
    handleChange: onCityChange,
    handleBlur: onCityBlur,
    isValid: cityIsValid,
    showError: showCityError,
  } = useInput([validators.isEmpty]);
  const {
    value: streetValue,
    handleChange: onStreetChange,
    handleBlur: onStreetBlur,
    isValid: streetIsValid,
    showError: showStreetError,
  } = useInput([validators.isEmpty]);
  const {
    value: postalCodeValue,
    handleChange: onPostalCodeChange,
    handleBlur: onPostalCodeBlur,
    isValid: postalCodeIsValid,
    showError: showPostalCodeError,
  } = useInput([validators.isEmpty, validators.isNumber]);

  useEffect(() => {
    httpErrorRef.current && httpErrorRef.current.focus();
  }, [error]);

  function onSubmit(event) {
    console.log('event', event)
    const formIsInvalid =
      !nameIsValid && !streetIsValid && !postalCodeIsValid && !cityIsValid;

    if (formIsInvalid) {
      console.log('errr')
      onCityBlur();
      onNameBlur();
      onStreetBlur();
      onPostalCodeBlur();
      return;
    }

    sendRequest(
      {
        url: API_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          name: nameValue,
          street: streetValue,
          postalCode: postalCodeValue,
          city: cityValue,
        },
      },
      (data) => {
        if (data) {
        }
      }
    );
  }

  return (
    <Form
      onSubmit={onSubmit}
      styles={classes.form}
    >
      <InputForm
        id='name'
        label='Your Name'
        hasError={showNameError}
        onChange={onNameChange}
        onBlur={onNameBlur}
        errorMsg='Error: Please enter your name'
      />
      <InputForm
        id='postalCode'
        label='Postal Code'
        hasError={showPostalCodeError}
        onChange={onPostalCodeChange}
        onBlur={onPostalCodeBlur}
        errorMsg='Error: Please enter your postal code'
      />
      <InputForm
        id='street'
        label='Street'
        hasError={showStreetError}
        onChange={onStreetChange}
        onBlur={onStreetBlur}
        errorMsg='Error: Please enter your street'
      />
      <InputForm
        id='city'
        label='City'
        hasError={showCityError}
        onChange={onCityChange}
        onBlur={onCityBlur}
        errorMsg='Error: Please enter your city'
      />
      {error && (
        <p
          tabIndex={-1}
          ref={httpErrorRef}
        >
          {error}
        </p>
      )}
      <div className={classes.actions}>
        <button
          type='button'
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </Form>
  );
};
