// cartRoutes.js

import express from 'express';
import Cart from '../models/Cart.js'; 
import Product from '../models/Product.js'; 
import { admin, protectRoute } from '../middleware/authMiddleware.js';

const cartRoutes = express.Router();

const getCartItems = async (req, res) => {
  
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

const addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body; // Use "userId" from the request body

  try {

    // // Check if the quantity is greater than zero
    // if (!quantity || quantity <= 0) {
    //     throw new Error('Invalid quantity. Please provide a quantity greater than zero.');
    //  }

    // Retrieve the product details including the stock
    const product = await Product.findById(productId);

    if (!product) {
      console.error(`Product not found for productId: ${productId}`);
      throw new Error('Product not found.');
    }
    
    console.log('Product details:', product);

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If the user doesn't have a cart yet, create one
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Check if adding this item would exceed the cart limit (e.g., 100 items)
    if (cart.items.length + 1 > 100) {
      throw new Error('Cart limit exceeded. You cannot add more items to the cart.');
    }
     
    // Check if the requested quantity exceeds the available stock
    if (quantity > product.stock) {
      throw new Error('Insufficient stock. The requested quantity exceeds available stock.');
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, update the quantity
      cart.items[existingItemIndex].quantity += quantity;

      // Check if the new quantity exceeds the available stock
      if (cart.items[existingItemIndex].quantity > product.stock) {
        throw new Error('New quantity exceeds available stock.');
      }
    } else {
      // If the product is not in the cart, add a new item
      cart.items.push({ product: productId, quantity });

      // Check if the new quantity exceeds the available stock
      if (quantity > product.stock) {
        throw new Error('New quantity exceeds available stock.');
      }
    }

    await cart.save();
    res.json(cart.items);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error adding item to the cart.' });
  }
};


const updateCartItem = async (req, res) => {
  const { userId, productId } = req.params; // Use "userId" and "productId" from URL parameters
  const { quantity } = req.body; // Use "quantity" from the request body

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const existingItem = cart.items.find(item => item.product.equals(productId));

    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found in the cart.' });
    }

    // Retrieve the product details including the stock
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Check if the updated quantity exceeds the available stock or is less than zero
    if (quantity > product.stock) {
      return res.status(400).json({ message: 'Updated quantity exceeds available stock.' });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: 'Updated quantity cannot be less than one.' });
    }

    // Update the quantity and save the cart
    existingItem.quantity = quantity;
    await cart.save();
    
    res.json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating cart item.' });
  }
};


 const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params; // Use "userId" and "productId" from URL parameters

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    cart.items = cart.items.filter(item => !item.product.equals(productId));
    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from the cart.' });
  }
};

cartRoutes.get('/:userId', getCartItems);
cartRoutes.post('/add', addItemToCart);
cartRoutes.put('/update/:userId/:productId', updateCartItem);
cartRoutes.delete('/remove/:userId/:productId', removeItemFromCart);

export default cartRoutes;
