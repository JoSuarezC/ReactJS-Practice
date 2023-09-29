import React from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import { useCartContext } from '../../context/cart-context';

const Cart = ({ toggleCart }) => {
  console.log('Cart')
  const cartCtx = useCartContext();
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  function onRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function onAddHandler(item) {
    cartCtx.addItem(item, 1);
  }

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      {...item}
      onRemove={() => onRemoveHandler(item.id)}
      onAdd={() => onAddHandler(item)}
    />
  ));

  return (
    <Modal onClose={toggleCart}>
      {hasItems && <ul className={classes['cart-items']}>{cartItems}</ul>}
      <p className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </p>
      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={toggleCart}
        >
          Close
        </button>
        {hasItems && (
          <button
            className={classes.button}
            onClick={toggleCart}
          >
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
