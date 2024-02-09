
import * as React from 'react'
import ProductsScreen from './screens/ProductsScreen';
import { ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import ProductScreen from './screens/ProductScreen';
import Header from './components/Header'
import Footer from './components/Footer'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import PasswordForgetForm from './components/authPages/PasswordForgetForm';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import axios from 'axios';
import { VStack, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
 
function App() {
  const [googleClient, setGoogleClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchGoogleClientId = async () => {
      try {
        const { data: googleId } = await axios.get('/api/config/google');
        setGoogleClient(googleId);
      } catch (error) {
        console.error('Error fetching Google client ID:', error);
        setError('Error fetching Google client ID. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleClientId();
  }, [googleClient]);
	// useEffect(() => {
	// 	const googleKey = async () => {
	// 		const { data: googleId } = await axios.get('/api/config/google');
	// 		setGoogleClient(googleId);
	// 	};
	// 	googleKey();
	// }, [googleClient]);


  // useEffect(() => {
  //   const fetchGoogleClientId = async () => {
  //     try {
  //       const { data: googleId } = await axios.get('/api/config/google');
  //       setGoogleClient(googleId);
  //     } catch (error) {
  //       console.error('Error fetching Google client ID:', error);
  //     }
  //   };

  //   fetchGoogleClientId();
  // }, [googleClient]);

  if (loading) {
    return (
      <VStack pt='37vh'>
        <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
      </VStack>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return  (

    <GoogleOAuthProvider clientId={googleClient}>
      <ChakraProvider>
        <Router>
          <Header/>
          <main>
            <Routes>
              <Route path='/' element={<LandingScreen />} />
              <Route path='/products' element={<ProductsScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/PasswordForgetForm' element={<PasswordForgetForm />} />
              <Route path='/registration' element={<RegistrationScreen />} />
              <Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
              <Route path='/password-reset/:token' element={<PasswordResetScreen />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ChakraProvider>
    </GoogleOAuthProvider>


  )
}
export default App;
