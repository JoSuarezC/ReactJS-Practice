import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useDispatch();

  const substractProductHandler = () => {
    dispatch(cartActions.substractProduct({
      id,
      quantity: 1,
    }));
  };

  const addProductHandler = () => {
    dispatch(
      cartActions.addProduct({
        id,
        title,
        price,
        quantity: 1,
      })
    );
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button
            aria-label={`Substract one ${title}`}
            onClick={substractProductHandler}
          >
            -
          </button>
          <button
            aria-label={`Add one ${title}`}
            onClick={addProductHandler}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
