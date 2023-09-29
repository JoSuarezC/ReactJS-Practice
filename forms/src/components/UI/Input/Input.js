import React from 'react';

const Input = ({ id, hasError, onChange, onBlur, label, errorMsg }) => {
  return (
    <div className={`form-control ${hasError ? 'invalid' : ''}`}>
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

export default Input;
