import React, { useCallback, useMemo, useReducer } from 'react';
import CartContext from './cart-context';

const actions = {
  ADD_ITEM: 'ADD_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function deleteItemHandler(state, action) {
  if (!action.id) {
    throw new Error('Error: Please specify an ID');
  }

  const index = state.items.findIndex((item) => item.id === action.id);

  if (index === -1) {
    throw new Error('Error: Item was not found');
  }

  const itemToRemove = state.items[index];
  const total = state.totalAmount - itemToRemove.price;

  itemToRemove.quantity > 1
    ? itemToRemove.quantity--
    : state.items.splice(index, 1);

  return {
    items: [...state.items],
    totalAmount: total,
  };
}

function addItemHandler(state, action) {
  if (!action.item || !action.addQuantity) {
    throw new Error('Error: Please specify an item object and an addQuantity parameter');
  }

  const existingIndex = state.items.findIndex(
    (item) => item.id === action.item.id
  );
  const newTotal = state.totalAmount + action.addQuantity * action.item.price;

  if (existingIndex !== -1) {
    const newItems = [...state.items];
    const item = newItems[existingIndex];
    item.quantity += action.addQuantity;
    return {
      items: newItems,
      totalAmount: newTotal,
    };
  }

  return {
    items: [...state.items, { ...action.item, quantity: action.addQuantity }],
    totalAmount: newTotal,
  };
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_ITEM: {
      return addItemHandler(state, action);
    }
    case actions.DELETE_ITEM: {
      return deleteItemHandler(state, action);
    }
    default:
      return defaultCartState;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatchCartAction] = useReducer(reducer, defaultCartState);
  console.info('Context Updated', state);

  const addItem = useCallback(
    (item, qty) => {
      dispatchCartAction({
        type: actions.ADD_ITEM,
        addQuantity: qty,
        item,
      });
    },
    [dispatchCartAction]
  );
  const removeItem = useCallback(
    (id) =>
      dispatchCartAction({
        type: actions.DELETE_ITEM,
        id,
      }),
    [dispatchCartAction]
  );
  const items = state.items;
  const totalAmount = state.totalAmount;

  const context = useMemo(
    () => {
      return {
        items: items,
        totalAmount: totalAmount,
        addItem,
        removeItem,
      }
    },
    [items, totalAmount, addItem, removeItem]
  );

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};
