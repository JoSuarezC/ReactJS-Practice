import React from 'react';
import classes from './InputForm.module.css';

const InputForm = ({ id, hasError, onChange, onBlur, label, errorMsg }) => {
  return (
    <div className={`${classes.control} ${hasError ? 'invalid' : ''}`}>
      <label htmlFor='name'>{label}</label>
      <input
        type='text'
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        name={id}
      />
      {hasError && <p className='error-text'>{errorMsg}</p>}
    </div>
  );
};

export default InputForm;
