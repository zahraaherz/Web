import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  items: [],
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
    setCart: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.items = payload.items;
      state.subtotal = calculateSubtotal(state.items);

		},
    addToCart: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.items = payload.items;
      state.subtotal = calculateSubtotal(state.items);
    },
    removeFromCart: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.items = state.items.filter((item) => item.id !== payload);
      state.subtotal = calculateSubtotal(state.items);
    },
    updateCartItem: (state, { payload }) => {
      const { id, quantity } = payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
        state.subtotal = calculateSubtotal(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, addToCart, removeFromCart, updateCartItem, clearCart , setCart } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;

const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
};
