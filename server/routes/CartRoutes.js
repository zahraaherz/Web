// cartRoutes.js

import express from 'express';
import Cart from '../models/Cart.js'; 
import Product from '../models/Product.js'; 

const cartRoutes = express.Router();

const getCart = async (req, res) => {
  
  try {
    const userId = req.params.userId;

    // Check if the user has a cart
    const userCart = await Cart.findOne({ user: userId }).populate('items.product', 'name price');

    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(userCart);
  } catch (error) {
    console.error('Error fetching user cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addToCart = async (userId, productId, quantity) => {
  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check if the quantity is greater than zero
    // if (!quantity || quantity <= 0) {
    //   throw new Error('Invalid quantity. Please provide a quantity greater than zero.');
    // }

    // Find the user's cart
    let userCart = await Cart.findOne({ user: userId });

    // // If user's cart doesn't exist, create a new one
    // if (!userCart) {
    //   userCart = new Cart({ user: userId, items: [] });
    // }

    // // Check if adding this item would exceed the cart limit (e.g., 100 items)
    // if (userCart.items.length >= 100) {
    //   throw new Error('Cart limit exceeded. You cannot add more items to the cart.');
    // }

    // Check if the product is already in the cart, update quantity if yes, add if no
    const existingItemIndex = userCart.items.findIndex(item => item.product.equals(productId));

    if (existingItemIndex !== -1) {
      // Product already exists in the cart
      const newQuantity = userCart.items[existingItemIndex].quantity + quantity;

      // // Check if the new quantity exceeds the available stock
      // if (newQuantity > product.stock) {
      //   throw new Error('Adding this item would exceed the available stock.');
      // }

      userCart.items[existingItemIndex].quantity = newQuantity;
    // } else {
    //   // Product does not exist in the cart
    //   // Check if the quantity exceeds the available stock
    //   if (quantity > product.stock) {
    //     throw new Error('Adding this item would exceed the available stock.');
    //   }

    //   userCart.items.push({ product: productId, quantity });
    
  }

    // Save the updated or new cart
    await userCart.save();

    return userCart;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};


const addToShoppingCart = async (currentCart, cartItem) => {
  try {
    // Find the existing cart using the currentCart ID
    const existingCart = await Cart.findById(currentCart);

    if (!existingCart) {
      // Handle the case where the cart is not found
      throw new Error('Cart not found');
    }

    // Check if the item already exists in the cart
    const existingItemIndex = existingCart.items.findIndex(item =>
      item.product.equals(cartItem.product)
    );

    if (existingItemIndex !== -1) {
      // If the item already exists, update the quantity
      existingCart.items[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // If the item does not exist, add it to the cart
      existingCart.items.push(cartItem);
    }

    // Save the updated cart
    const updatedCart = await existingCart.save();

    return updatedCart;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error updating the shopping cart:', error.message);
    throw error; // Propagate the error for further handling if needed
  }
};

// // Example usage:
// // Replace 'YOUR_USER_ID', 'PRODUCT_ID_TO_ADD', and 2 with actual values
// const updatedCart = await addToCart('YOUR_USER_ID', 'PRODUCT_ID_TO_ADD', 2);
// console.log(updatedCart);


// const removeFromCart = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;

//     // Check if the user has a cart
//     const userCart = await Cart.findOne({ user: userId });
//     if (!userCart) {
//       return res.status(404).json({ error: 'Cart not found' });
//     }

//     // Find the index of the item in the cart
//     const itemIndex = userCart.items.findIndex(item => item.product.equals(productId));

//     if (itemIndex !== -1) {
//       // Remove the item from the cart
//       userCart.items.splice(itemIndex, 1);
//       await userCart.save();
//       res.json(userCart);
//     } else {
//       res.status(404).json({ error: 'Item not found in the cart' });
//     }
//   } catch (error) {
//     console.error('Error removing item from cart:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// const reduceOneItemFromCart = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;

//     // Find the user's cart
//     const userCart = await Cart.findOne({ user: userId });
//     if (!userCart) {
//       return res.status(404).json({ error: 'Cart not found' });
//     }

//     // Find the index of the item in the cart
//     const itemIndex = userCart.items.findIndex(item => item.product.equals(productId));

//     // Check if the item is in the cart
//     if (itemIndex !== -1) {
//       // Reduce the quantity of the item by one
//       if (userCart.items[itemIndex].quantity > 1) {
//         userCart.items[itemIndex].quantity -= 1;
//       } else {
//         // If the quantity is 1, remove the item from the cart
//         userCart.items.splice(itemIndex, 1);
//       }

//       // Save the updated cart
//       await userCart.save();
//       res.json(userCart);
//     } else {
//       res.status(404).json({ error: 'Item not found in the cart' });
//     }
//   } catch (error) {
//     console.error('Error reducing one item from cart:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



cartRoutes.route('/:userId').get(getCart);
cartRoutes.route('/add').post(addToShoppingCart);
// cartRoutes.route('/remove/:userId/:productId').delete(removeFromCart);
// cartRoutes.route('/reduce/:userId/:productId').delete(reduceOneItemFromCart);

export default cartRoutes;
