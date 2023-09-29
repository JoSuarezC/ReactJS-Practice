import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef(({
  id,
  type,
  label,
  isValid,
  value,
  onChange,
  onBlur,
}, ref) => {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  // Customize how instance will look on parent view
  useImperativeHandle(ref, () => {
    return {
      focus: focusInput,
    };
  })

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={id}> {label} </label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
});

export default Input;