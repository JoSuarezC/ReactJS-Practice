import { createSlice } from '@reduxjs/toolkit';

export const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice;

// Old Redux Implementation
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'increment':
//       return {
//         ...state,
//         counter: state.counter + 1,
//       };
//     case 'decrement':
//       return {
//         ...state,
//         counter: state.counter - 1,
//       };
//     case 'increase':
//       return {
//         ...state,
//         counter: state.counter + action.increase,
//       };
//     case 'toggle':
//       return {
//         ...state,
//         showCounter: !state.showCounter,
//       };
//     default:
//       return state;
//   }
// };
