import { Box, Wrap , Button, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import ProductCard from "../components/products/ProductCard";
import { useEffect } from "react";
import { ProductGrid } from '../components/products/ProductGrid'
import {useSelector , useDispatch} from 'react-redux'
import { getProducts } from "../redux/actions/productActions";
import {ArrowLeftIcon , ArrowRightIcon} from '@chakra-ui/icons';



const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { products, pagination, loading, error, favouriteToggle } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);

  const PaginationButton = (page) => {
    dispatch(getProducts(page));
  }

  return (
    <>
      {products.length > 0 && (
        <Box maxW="7xl" mx="auto" px={{ base: '4', md: '8', lg: '12' }} py={{ base: '6', md: '8', lg: '12' }}>
            <ProductGrid>

          {error? (
            <Alert status='error'>
              <AlertIcon/>
              <AlertTitle>We Are Sorry</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>)
            :(
              
            products.map((product) => (
              <ProductCard key={product.id} product={product} loading={loading} />
            ))
          )}
            
          </ProductGrid>

          {!favouriteToggle &&
            <Wrap spacing='10px' justify='center' p='5'>
              <Button colorScheme='gray' onClick={() => PaginationButton(1)} >
                <ArrowLeftIcon />
              </Button>
              {Array.from(Array(pagination.totalPages), (e, i) => (
                <Button key={i} onClick={() => PaginationButton(i + 1)} colorScheme={pagination.currentPage === i +1 ? 'cyan' : 'gray'}>
                  {i + 1}
                </Button>
              ))}
              <Button colorScheme='gray' onClick={() => PaginationButton(pagination.totalPages)} >
                <ArrowRightIcon />
              </Button>
            </Wrap>
          }
        </Box>
      )}
    </>
  );
};

export default ProductsScreen;
