import React from 'react';
import classes from './Input.module.css';

export const Input = ({ id, type, label }) => {
  return (
    <p className={classes.input}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
      />
    </p>
  );
};
