/// the alert need to be updated so that if the quantity in the cant + added quantity is more than the stock it will give me an alert

import React, { useState  , useEffect} from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Rating } from './Rating';
import { FavouriteButton } from './FavouriteButton';
import { PriceTag } from './PriceTag';
import { addToCart, getCart } from '../../redux/actions/cartAction';

const ProductCard = ({ product, loading, rootProps }) => {
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const userCart = useSelector((state) => state.cart );

  useEffect(() => {
    // console.log('userInfo.userInfo:', userInfo.userInfo._id); // Assuming cart structure has an "items" property

    if (userInfo && userInfo.userInfo) {
      dispatch(getCart(userInfo.userInfo._id));
    }
  }, [dispatch, userInfo]);

  // useEffect(() => {
  //   console.log('User Cart Items:', userCart.items); // Assuming cart structure has an "items" property
  // }, [userCart]);

  // Function to find matching items based on product ID
const findMatchingItem = (items, productId) => {
  return items.filter(item => item.product._id === productId);
};

  const handleAddToCart = async () => {
    try {
      // Check if the user is authenticated
      if (!userInfo || !userInfo.userInfo) {
        console.error('Error: User not authenticated');
        return;
      }
  
      // Check if the product is in stock
      if (product.stock === 0) {
        setShowAlert(true);
        setAlertMessage('Sorry, this item is out of stock.');
        setAlertTimeout();
        return;
      }
  
      const quantityToAdd = 1;
  
      // Check if userCart and userCart.items are defined
      if (!userCart || !userCart.items) {
        console.error('Error: Invalid user cart structure');
        return;
      }
  
      // console.log('User Cart before:', userCart.items);
      // console.log('product._id', product._id);
    //   if (userCart || userCart.items) {

    //   const cartItem = userCart.items.find(item => item.product._id === product._id);
    //   console.log('Cart Item:', cartItem);
    //   return;

    // }
  
      // const currentQuantityInCart = cartItem ? cartItem.quantity : 0;
      // console.log('currentQuantityInCart', currentQuantityInCart);
  
      // // Check if adding to the cart exceeds the available stock
      // if (quantityToAdd + currentQuantityInCart > product.stock) {
      //   setShowAlert(true);
      //   setAlertMessage(`Only ${product.stock - currentQuantityInCart} items available in stock.`);
      //   setAlertTimeout();
      //   return;
      // }
  
      // Add loading state here if needed
  
      // Continue with the addToCart action
      await dispatch(addToCart(userInfo.userInfo._id, product._id, quantityToAdd));
      setShowAlert(true);
      setAlertMessage('Item added to cart successfully!');
      setAlertTimeout();
    } catch (error) {
      console.error('Error adding to cart:', error);
  
      // Provide more detailed error information during development
      const errorMessage = error?.response?.data?.message || 'Error adding item to the cart. Please try again.';
      
      setShowAlert(true);
      setAlertMessage(errorMessage);
      setAlertTimeout();
    }
  };
  

  
  const setAlertTimeout = () => {
    // Set a timeout to hide the alert after 20 seconds
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 1000);
  };

  return (
    <Stack spacing={{ base: '4', md: '5' }} _hover={{ transform: 'scale(1.1)', transitionDuration: '0.5s' }} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            src={product.images?.[isShown && product.images.length === 2 ? 1 : 0]}
            alt={product.name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={{ base: 'md', md: 'xl' }}
          />
        </AspectRatio>
        <FavouriteButton productId={product._id} position="absolute" top="4" right="4" aria-label={`Add ${product.name} to your favourites`} />
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="medium">
            {product.name}
          </Text>
          <PriceTag price={product.price} currency="USD" />
        </Stack>
        <HStack>
          <Rating defaultValue={product.rating} size="sm" />
          <Text fontSize="sm">
            12 Reviews
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <Button
          colorScheme="blue"
          width="full"
          onClick={() => {
            console.log('Button clicked!');
            handleAddToCart();
          }}>
          Add to cart
        </Button>
        <Link textDecoration="underline" fontWeight="medium" as={ReactLink} to={`/product/${product._id}`} isLoaded={!loading}>
          Quick shop
        </Link>
        {showAlert && (
          <Alert status="success" mt={2}>
            <AlertIcon />
            {alertMessage}
          </Alert>
        )}
      </Stack>
    </Stack>
  );
};

export default ProductCard;
