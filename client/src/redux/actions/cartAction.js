import axios from 'axios';
import {
  setLoading as setCartLoading,
  setError as setCartError,
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartItem as updateCartItemAction,
  clearCart as clearCartAction,
  setCart
} from '../slices/cart';



export const getCart = (userInfo) => async (dispatch) => {

	dispatch(setCartLoading(true));
	try {
		const { data } = await axios.get(`/api/cart/${userInfo}`);
		dispatch(setCart(data));
	} catch (error) {
		dispatch(
			setCartError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'An expected error has occured. Please try again later.'
			)
		);
	}
  };

  export const addToCart = (userId, productId, quantity) => async (dispatch, getState) => {
	dispatch(setCartLoading());
  
	try {
	  const { userInfo } = getState().user;
  
	  if (userInfo) {
		const config = {
		  headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' },
		};
  
		console.log('Making API request to add to cart');

		const response = await axios.post(`/api/cart/add`, { userId, productId, quantity }, config);
		// Log the response data
		console.log('API Response:', response.data);
  
		// Assuming addToCartAction takes a cart data object as payload
		dispatch(addToCart(response.data));
	  } else {
		// Save data to local storage if userInfo is not available
		const localCartData = JSON.parse(localStorage.getItem('localCart')) || [];
		const newCartItem = { userId, productId, quantity };
		localCartData.push(newCartItem);
		localStorage.setItem('localCart', JSON.stringify(localCartData));
  
		// You may want to dispatch an action indicating that the item was added to local storage
		// dispatch(addToLocalStorageAction(newCartItem));
	  }
	} catch (error) {
	  console.error('Error in addToCart action:', error);
	  // Handle errors as needed
	}
  };
  
  

// Action to remove an item from the cart
export const removeFromCart = (userId, productId) => async (dispatch) => {
	dispatch(setCartLoading());
  
	try {
	  const response = await axios.delete(`/api/cart/remove/${userId}/${productId}`);
  
	  // Assuming removeFromCartAction takes an updated cart data object as payload
	  dispatch(removeFromCartAction(response.data));
	} catch (error) {
	  // Handle specific error cases if needed
	  if (error.response) {
		// The request was made, but the server responded with a status code outside the range of 2xx
		dispatch(setCartError(error.response.data.message || 'Error removing item from the cart.'));
	  } else if (error.request) {
		// The request was made, but no response was received
		dispatch(setCartError('No response received from the server.'));
	  } else {
		// Something happened in setting up the request that triggered an Error
		dispatch(setCartError('An unexpected error occurred.'));
	  }
	}
  };

// Action to update the quantity of an item in the cart
export const updateCartItem = (userId, productId, quantity) => async (dispatch) => {
  dispatch(setCartLoading());

  try {
    const response = await axios.put(`/api/cart/update/${userId}/${productId}`, {
      quantity,
    });

    // Assuming updateCartItemAction takes an updated cart data object as payload
    dispatch(updateCartItemAction(response.data));
  } catch (error) {
    // Handle specific error cases if needed
    if (error.response) {
      // The request was made, but the server responded with a status code outside the range of 2xx
      dispatch(setCartError(error.response.data.message || 'Error updating cart item.'));
    } else if (error.request) {
      // The request was made, but no response was received
      dispatch(setCartError('No response received from the server.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      dispatch(setCartError('An unexpected error occurred.'));
    }
  }
}

// Action to clear the cart
export const clearCart = (userId) => async (dispatch) => {
	dispatch(setCartLoading());
  
	try {
	  await axios.delete(`/api/cart/clear/${userId}`);
  
	  // Assuming clearCartAction doesn't require a payload
	  dispatch(clearCartAction());
	} catch (error) {
	  // Handle specific error cases if needed
	  if (error.response) {
		// The request was made, but the server responded with a status code outside the range of 2xx
		dispatch(setCartError(error.response.data.message || 'Error clearing the cart.'));
	  } else if (error.request) {
		// The request was made, but no response was received
		dispatch(setCartError('No response received from the server.'));
	  } else {
		// Something happened in setting up the request that triggered an Error
		dispatch(setCartError('An unexpected error occurred.'));
	  }
	}
  };

// Action to handle cart-related errors
export const handleCartError = (dispatch, errorMessage) => {
  dispatch(setCartError(errorMessage));
};

