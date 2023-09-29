import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counter-reducer';
import authSlice from './auth-reducer.js';

//import { legacy_createStore } from 'redux';

//const store = legacy_createStore(reducer);

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
