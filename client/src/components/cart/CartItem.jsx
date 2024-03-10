import { CloseButton, Flex, Link, Select, useColorModeValue } from '@chakra-ui/react'
import { PriceTag } from '../products/PriceTag'
import { CartProductMeta } from './CartProductMeta'
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByIds , getProduct} from '../../redux/actions/productActions';
import React, { useState  , useEffect} from 'react';
import product from '../../redux/slices/product';


const QuantitySelect = ({ value, maxStock, onChange, ...props }) => {
  const quantityOptions = Array.from({ length: Math.min(maxStock, 10) }, (_, index) => index + 1);
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      value={value}
      onChange={onChange}
      {...props}
    >
      {quantityOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

// ...
// ... other imports

// export const CartItem = ({ cartItem }) => {
//   const { product } = useSelector((state) => state.product);
//   const dispatch = useDispatch();

//   const {
//     product: {_id, name, price , description , images },
//     quantity,
//     currency,
//     onChangeQuantity,
//     onClickDelete,
//   } = cartItem

//   useEffect(() => {
 
//       // Dispatch the action to fetch product details by IDs
//       dispatch(getProduct(_id));
//   }, [product, dispatch]);


//   // Now you can use the updated product details from the state
//   // const updatedProductDetails = useSelector((state) => state.product.product);



//   console.log('updatedCartItemProduct', cartItem);



//   // return (
//   //   <Flex
//   //     direction={{
//   //       base: 'column',
//   //       md: 'row',
//   //     }}
//   //     justify="space-between"
//   //     align="center"
//   //   >
//   //     <CartProductMeta
//   //       name={name}
//   //       description={mergedProduct.description}
//   //       image={mergedProduct.images}
//   //       isGiftWrapping={isGiftWrapping}
//   //     />

//   //     {/* Desktop */}
//   //     <Flex
//   //       width="full"
//   //       justify="space-between"
//   //       display={{
//   //         base: 'none',
//   //         md: 'flex',
//   //       }}
//   //     >
//   //       <QuantitySelect
//   //         defaultValue={quantity}
//   //         maxStock={mergedProduct.stock} // Ensure you have 'stock' available in the component
//   //         onChange={(e) => {
//   //           onChangeQuantity?.(+e.currentTarget.value);
//   //         }}
//   //       />
//   //       <PriceTag price={price} currency={currency} />
//   //       <CloseButton aria-label={`Delete ${name} from cart`} onClick={onClickDelete} />
//   //     </Flex>

//   //     {/* Mobile */}
//   //     <Flex
//   //       mt="4"
//   //       align="center"
//   //       width="full"
//   //       justify="space-between"
//   //       display={{
//   //         base: 'flex',
//   //         md: 'none',
//   //       }}
//   //     >
//   //       <Link fontSize="sm" textDecor="underline" onClick={onClickDelete}>
//   //         Delete
//   //       </Link>
//   //       <QuantitySelect
//   //         defaultValue={quantity}
//   //         maxStock={mergedProduct.stock} // Ensure you have 'stock' available in the component
//   //         onChange={(e) => {
//   //           onChangeQuantity?.(+e.currentTarget.value);
//   //         }}
//   //       />
//   //       <PriceTag price={price} currency={currency} />
//   //     </Flex>
//   //   </Flex>
//   // );
// };
export const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { product: cartProduct, loading } = cartItem;
  const { product: fetchedProduct } = useSelector((state) => state.product);

    const {
    product: {_id, name, price , description , images },
    quantity,
    currency,
    onChangeQuantity,
    onClickDelete,
  } = cartItem

  useEffect(() => {

  // Check if the product is not yet fetched or if the ID has changed
  if (cartProduct._id && (fetchedProduct === null || cartProduct._id !== fetchedProduct._id)) {
    console.log('_id', cartProduct._id )

    dispatch(getProduct(cartProduct._id));
  } 
 }, [cartProduct._id, fetchedProduct, dispatch]);

  console.log('cartProduct', cartProduct )
  console.log('fetchedProduct', fetchedProduct )
 
  return (
    <>
      {(!loading && (cartProduct || fetchedProduct)) && (
        <Flex
          direction={{
            base: 'column',
            md: 'row',
          }}
          justify="space-between"
          align="center"
        >
          {/* Pass the relevant product details as props to CartProductMeta */}
          <CartProductMeta
            name={cartProduct ? cartProduct.name : fetchedProduct.name}
            description={cartProduct ? cartProduct.description : fetchedProduct.description}
            image={cartProduct ? cartProduct.images : fetchedProduct.images}
            isGiftWrapping={cartProduct ? cartProduct.isGiftWrapping : fetchedProduct.isGiftWrapping}
          />

          {/* Desktop */}
          <Flex
            width="full"
            justify="space-between"
            display={{
              base: 'none',
              md: 'flex',
            }}
          >
            <QuantitySelect
              defaultValue={cartItem.quantity}
              maxStock={cartProduct ? cartProduct.stock : fetchedProduct.stock}
              onChange={(e) => {
                // Assuming you have an onChangeQuantity function in your component
                onChangeQuantity?.(+e.currentTarget.value);
              }}
            />
            <PriceTag price={cartProduct ? cartProduct.price : fetchedProduct.price} currency={cartProduct ? cartProduct.currency : fetchedProduct.currency} />
            <CloseButton aria-label={`Delete ${cartProduct ? cartProduct.name : fetchedProduct.name} from cart`} onClick={onClickDelete} />
          </Flex>

          {/* Mobile */}
          <Flex
            mt="4"
            align="center"
            width="full"
            justify="space-between"
            display={{
              base: 'flex',
              md: 'none',
            }}
          >
            <Link fontSize="sm" textDecor="underline" onClick={onClickDelete}>
              Delete
            </Link>
            <QuantitySelect
              defaultValue={cartItem.quantity}
              maxStock={cartProduct ? cartProduct.stock : fetchedProduct.stock}
              onChange={(e) => {
                // Assuming you have an onChangeQuantity function in your component
                onChangeQuantity?.(+e.currentTarget.value);
              }}
            />
            <PriceTag price={cartProduct ? cartProduct.price : fetchedProduct.price} currency={cartProduct ? cartProduct.currency : fetchedProduct.currency} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

