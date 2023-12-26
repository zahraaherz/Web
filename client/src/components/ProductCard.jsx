import {  Badge, Flex, IconButton } from '@chakra-ui/react'
// import {BiExpand} from 'react-icons/bi'
import React , {useState} from 'react'
import {AspectRatio,Box, Button, HStack, Image,
    Link,
    Skeleton,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { Rating } from './Rating'
  import { FavouriteButton } from './FavouriteButton'
  import { PriceTag } from './PriceTag'
  import { useDispatch, useSelector } from 'react-redux';
  import {Link as ReactLink} from 'react-router-dom';

  
  export const ProductCard = ({ product , loading }) => {
    const [ isShown, setIsShown ] = useState(false)
    // const { name, imageUrl, price, salePrice, rating } = product
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.product);
  
    return (
      <Stack 
        spacing={{
          base: '4',
          md: '5',
        }}
        
        _hover = {{transform:'scale(1.1)' , transitionDuration: '0.5s'}}
        isLoaded = {!loading} 
        // {...rootProps}
        as={ReactLink}
        to={`/product/${product._id}`}
        >
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              onMouseEnter={() => setIsShown(true)}  
              onMouseLeave={() => setIsShown(false)}   
              src={product.images[isShown && product.images.length === 2 ? 1 : 0]}
              alt={product.name}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={{
                base: 'md',
                md: 'xl',
              }}
            />
          </AspectRatio>
          <FavouriteButton
            productId={product._id}
            position="absolute"
            top="4"
            right="4"
            aria-label={`Add ${product.name} to your favourites`}
          />
          
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
              {product.name}
            </Text>
            <PriceTag price={product.price} salePrice={product.salePrice} currency="USD" /> BD
          </Stack>
          <HStack>
            <Rating defaultValue={product.rating} size="sm" />
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              {product.stock < 5 ? (
                <Badge colorScheme= 'yellow'> Only {product.stock} left </Badge>
             ): product.stock < 1 ?(
                <Badge colorScheme= ' red'> Sold Out </Badge>
             ) :  <Badge colorScheme='green'> {product.stock} In Stock </Badge>
            } 
            </Text>
          </HStack>
        </Stack>
        <Stack align="center">
          <Button colorScheme="blue" width="full">
            Add to cart
          </Button>
          <Link
            textDecoration="underline"
            fontWeight="medium"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            Quick shop
          </Link>
        </Stack>
      </Stack>
    )
  }
// const ProductCard = ({ product , loading }) => {
//   return (
//     <Skeleton isLoaded = {!loading} _hover={{size: 1.5}}>
//         <Box _hover = {{transform:'scale(1.1)' , transitionDuration: '0.5s'}}
//             borderWidth = '1px'
//             overflow = 'hidden'
//             p = '4'
//             shadow = 'md' >
//             <Image/>
//             {/* see if the products in stock  */}
//             {product.stock < 5 ? (
//                 <Badge colorScheme= 'yellow'> Only {product.stock} left </Badge>
//              ): product.stock < 1 ?(
//                 <Badge colorScheme= ' red'> Sold Out </Badge>
//              ) :  <Badge colorScheme='green'> {product.stock} In Stock </Badge>
//             } 
//              {/* see if the product is new */}
//              {product.productIsNew && (
//                 <Badge ml='2' colorScheme='purple'>
//                 New
//                 </Badge>
//              )}
//             <text noOfLines = {1} frontSize = 'x1' fontWidgth='semibold' mt='2'> 
//             {product.brand}

//             </text>
//         </Box>
//     </Skeleton>
//   )
// }

export default ProductCard