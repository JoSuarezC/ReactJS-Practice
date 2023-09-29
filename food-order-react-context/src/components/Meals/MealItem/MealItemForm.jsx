import React, { useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = ({ id, onAddItem }) => {
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = event.target[id].value;

    if (amount.trim() === '' || amount < 1 || amount > 5) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    onAddItem(amount);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        label='Amount'
        input={{
          id: id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
          name: id,
        }}
      />
      {
        !isValid && <p>Error: Please enter a valid amount</p>
      }
      <button onSubmit={handleSubmit} type='submit'>+ Add</button>
    </form>
  );
};

export default MealItemForm;
