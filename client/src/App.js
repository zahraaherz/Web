
import * as React from 'react'
import ProductsScreen from './screens/ProductsScreen';
import { ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Router>
        <main>
          <Routes>
            <Route path='/' element={<ProductsScreen />} />
          </Routes>
        </main>
      </Router>
      
    </ChakraProvider>
  )
}
export default App;
