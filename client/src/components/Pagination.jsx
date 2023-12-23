// import React, { ReactNode } from 'react';
// import PropTypes from 'prop-types';
// import { Box, Stack, useColorModeValue } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from '../redux/actions/productActions';

// const PaginationContainer = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         maxWidth: '7xl',
//         width: 'full',
//         height: '218px',
//         alignItems: 'center',
//         padding: '10px',
//       }}
//     >
//       <Pagination />
//     </div>
//   );
// };

// const Pagination = () => {
//     const { pagination } = useSelector((state) => state.product);

//   return (
//     <Stack
//       direction={{ base: 'column', sm: 'row' }}
//       as="nav"
//       aria-label="Pagination"
//       spacing={2}
//       width="full"
//       justifyContent="center"
//       alignItems="center"
//       marginTop={{ base: 3, md: 0 }}
//     >
//       <Box>
//         <PaginationButton>Previous</PaginationButton>
//       </Box>
//       <Stack direction="row" spacing={2}>
//         {/* {Array.from(Array(pagination.totalPages), (e,i) => {
//             return(
//                 <PaginationButton  key={i} onClick={PaginationButton(i+1)}>
//                     {i+1}
//                 </PaginationButton>
//             )
//         })} */}
        
//       </Stack>
//       <Box>
//         <PaginationButton isDisabled>Next</PaginationButton>
//       </Box>
//     </Stack>
//   );
// };

// const PaginationButton = ({ children, isDisabled, isActive } , page) => {
//     const dispatch = useDispatch()
//     const { pagination } = useSelector((state) => state.product);
//     dispatch(getProducts(page))
//     const activeStyle = {
//     background: useColorModeValue('gray.500', 'gray.700'),
//     color: 'white',
//   };

//   return (
//     <button
//       style={{
//         padding: '8px 16px',
//         border: '1px solid',
//         borderColor: useColorModeValue('gray.200', 'gray.700'),
//         borderRadius: '4px',
//         cursor: isDisabled ? 'not-allowed' : 'pointer',
//         ...(isActive && activeStyle),
//         ...(isDisabled && { opacity: 0.5 }),
//         transition: 'background 0.3s',
//       }}
//     >
//       {children}
//     </button>
//   );
// };

// PaginationButton.propTypes = {
//   children: PropTypes.node.isRequired,
//   isDisabled: PropTypes.bool,
//   isActive: PropTypes.bool,
// };

// export default PaginationContainer;
