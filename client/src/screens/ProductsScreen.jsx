import { Box, Wrap } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProductGrid } from '../components/ProductGrid'
import {useSelector , useDispatch} from 'react-redux'
import { getProducts } from "../redux/actions/productActions";

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const {products , pagination , loading , error} = useSelector((state) => state.product);
  // const [data, setData] = useState([]);

  useEffect(() => {
   dispatch(getProducts())
  }, [dispatch]);

  return (
    <>
      {products.length > 0 && (
        <Box maxW="7xl" mx="auto" px={{ base: '4',md: '8',lg: '12', }} py={{ base: '6', md: '8', lg: '12',}} >
            <ProductGrid>
                {products.map((product) => (
                   <ProductCard key={product.id} product={product} loading={loading} />
                 ))}
            </ProductGrid>
         </Box>

            // {/* <Wrap spacing='30px' justify='center' minHeight='80vh' mx={{base: '12', md: '20', lg: 32}}>
            // <ProductCard product={data[0]} loading={false} />
            // </Wrap> */}
      )}
    </>
  );
};

export default ProductsScreen;
