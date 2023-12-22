
import * as React from 'react'
import ProductsScreen from './screens/ProductsScreen';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <ProductsScreen />
    </ChakraProvider>
  )
}
export default App;
