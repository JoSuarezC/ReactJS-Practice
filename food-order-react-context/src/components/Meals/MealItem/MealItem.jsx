import React from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import { useCartContext } from '../../../context/cart-context';

const MealItem = ({ id, name, description, price }) => {
  const priceFormatted = `$${price.toFixed(2)}`;
  const { addItem } = useCartContext();
  console.log('MealItem')
  const onAddItem = (amount) => {
    addItem(
      {
        id,
        name,
        description,
        price,
      },
      +amount
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <p className={classes.description}>{description}</p>
        <p className={classes.price}>{priceFormatted}</p>
      </div>
      <MealItemForm
        id={id}
        onAddItem={onAddItem}
      />
    </li>
  );
};

export default React.memo(MealItem);
