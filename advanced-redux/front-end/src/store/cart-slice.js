import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  products: [],
  totalQuantity: 0,
  cartChanged: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    replaceCart(state, actions) {
      state.cartChanged = false;
      state.products = actions.payload;
      state.totalQuantity = state.products.reduce((prev, current) => {
        return prev + current.quantity;
      }, 0);
    },
    addProduct(state, actions) {
      const existingProduct = state.products.find(
        (p) => p.id === actions.payload.id
      );

      if (!existingProduct) {
        state.products.push({
          ...actions.payload,
          total: actions.payload.quantity * actions.payload.price,
        });
      } else {
        existingProduct.quantity += actions.payload.quantity;
        existingProduct.total +=
          actions.payload.quantity * actions.payload.price;
      }
      state.cartChanged = true;
      state.totalQuantity += actions.payload.quantity;
    },
    substractProduct(state, actions) {
      const existingProductIndex = state.products.findIndex(
        (p) => p.id === actions.payload.id
      );

      if (existingProductIndex === -1) {
        throw new Error('Item does not exists');
      }

      const product = state.products[existingProductIndex];

      if (product.quantity > 1) {
        product.quantity -= actions.payload.quantity;
        product.total -= actions.payload.quantity * product.price;
      } else {
        state.products.splice(existingProductIndex, 1);
      }

      state.cartChanged = true;
      state.totalQuantity -= actions.payload.quantity;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
