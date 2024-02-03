import axios from 'axios';
import { setError, setLoading, setShippingCosts, cartItemAdd, cartItemRemoval, clearCart } from '../slices/cart';

'// Async action to add an item to the cart
export const addItemToCart = (item) => async (dispatch) => {
	try {
	  dispatch(setLoading());
	  // Make API call to add item to the cart
	  const response = await axios.post('/api/cart/add', item);
	  dispatch(cartItemAdd(response.data)); // Assuming the response is the updated cart
	} catch (error) {
	  dispatch(setError(error.message));
	}
  };

// Async action to remove an item from the cart
export const removeItemFromCart = (itemId) => async (dispatch) => {
	try {
	  dispatch(setLoading());
	  // Make API call to remove item from the cart
	  await axios.delete(`/api/cart/remove/${itemId}`);
	  dispatch(cartItemRemoval(itemId));
	} catch (error) {
	  dispatch(setError(error.message));
	}
  };

export const setShipping = (value) => async (dispatch) => {
	dispatch(setShippingCosts(value));
};

export const resetCart = () => (dispatch) => {
	dispatch(clearCart()); // Correctly dispatch the clearCart action
  };