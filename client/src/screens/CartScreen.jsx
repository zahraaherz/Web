import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Stack,
  Link,
  HStack,
  useColorModeValue as mode,
  Flex,
  Text,
} from '@chakra-ui/react';
import { CartItem } from '../components/cart/CartItem';
import { CartOrderSummary } from '../components/cart/CartOrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../redux/actions/cartAction';
import { cartSelector } from '../redux/slices/cart';

const CartScreen = () => {
  const dispatch = useDispatch();
  const {  subtotal } = useSelector(cartSelector);
  const userInfo = useSelector((state) => state.user);
	const { loading, error , items } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userInfo && userInfo.userInfo) {
      dispatch(getCart(userInfo.userInfo._id));
    }
  }, [dispatch, userInfo]);

    console.log('Items:', items)

  return (
    <Box
      maxW={{
        base: '3xl',
        lg: '7xl',
      }}
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
    >
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        align={{
          lg: 'flex-start',
        }}
        spacing={{
          base: '8',
          md: '16',
        }}
      >
        <Stack
          spacing={{
            base: '8',
            md: '10',
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({items?.length || 0} items)
          </Heading>

          <Stack spacing="6">
            {loading ? (
              <p>Loading...</p>
            ) : items?.length ? (
              // items.map((item) => <CartItem key={item.id} {...item} />)
              items.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
              
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary subtotal={subtotal} />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default CartScreen;

