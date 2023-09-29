import React, { useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useCartContext } from '../../context/cart-context';

const HeaderCartButton = ({ onClick }) => {
  const { items } = useCartContext();
  const [isBtnHighlated, setIsBtnHighlated] = useState(false);
  const totalQty =
    items?.reduce((total, item) => total + item.quantity, 0) ?? 0;
  console.log('HeaderCartButton')
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBtnHighlated(true);

    const timer = setTimeout(() => {
      setIsBtnHighlated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `${classes.button} ${isBtnHighlated ? classes.bump : ''}`;

  return (
    <button
      className={btnClasses}
      onClick={onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalQty}</span>
    </button>
  );
};

export default HeaderCartButton;
