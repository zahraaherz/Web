
import * as React from 'react'
import ProductsScreen from './screens/ProductsScreen';
import { ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import ProductScreen from './screens/ProductScreen';
import Header from './components/Header'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Router>
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<LandingScreen />} />
            <Route path='/products' element={<ProductsScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />


          </Routes>
        </main>
      </Router>
      
    </ChakraProvider>
  )
}
export default App;
