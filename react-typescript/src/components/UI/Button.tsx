import React, { MouseEventHandler } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  type?: 'submit' | 'button' | 'reset';
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>
};
export const Button: React.FC<ButtonProps> = ({ type, label, onClick }) => {
  return (
    <button
      className={classes.button}
      type={type || 'button'}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;