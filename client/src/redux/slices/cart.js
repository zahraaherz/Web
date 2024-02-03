import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const calculateSubtotal = (cartState) => {
  let result = 0;

  if (cartState && cartState.length) {
    cartState.forEach((item) => {
      result += item.qty * item.price;
    });
  }

  return result;
};

export const initialState = {
  loading: false,
  error: null,
  cartItems: [],
  shipping: Number(1),
  subtotal: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    cartItemAdd: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.cartItems = [...state.cartItems, payload];
      state.subtotal = calculateSubtotal(state.cartItems);
    },
    cartItemRemoval: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.cartItems = [...state.cartItems].filter((item) => item.id !== payload);
      state.subtotal = calculateSubtotal(state.cartItems);
    },
    setShippingCosts: (state, { payload }) => {
      state.shipping = payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.shipping = Number(1);
      state.subtotal = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setError,
  setLoading,
  cartItemAdd,
  cartItemRemoval,
  setShippingCosts,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
