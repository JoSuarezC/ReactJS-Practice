import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/counter-reducer';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  const toggleCounterHandler = () => {
    // dispatch({
    //   type: 'toggle',
    // });
    dispatch(counterActions.toggle());
  };

  const incrementHandler = () => {
    // dispatch({
    //   type: 'increment',
    // });
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    // dispatch({
    //   type: 'decrement',
    // });
    dispatch(counterActions.decrement());
  };

  const increaseHandler = (amount) => {
    // dispatch({
    //   type: 'increase',
    //   increase: amount,
    // });
    dispatch(counterActions.increase(amount));
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={() => increaseHandler(5)}>Increase by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
