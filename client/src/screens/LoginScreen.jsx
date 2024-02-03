import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertIcon, Box, Button, Container, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { login } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  // Redirect if userInfo is available
  if (userInfo) {
    navigate('/products');
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }}>
      <Stack spacing="8">
        <Box
          py={{ base: '0', md: '8' }}
          px={{ base: '4', md: '10' }}
          bg={{ base: 'transparent', md: 'bg-surface' }}
          boxShadow={{ base: 'none', md: 'xl' }}
        >
          <Stack spacing="6">
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button colorScheme="cyan" size="lg" fontSize="md" isLoading={loading} onClick={handleLogin}>
              Sign in
            </Button>
            <Text fontSize="sm" color="blue.500" onClick={() => navigate('/PasswordForgetForm')}>
                   Forgot Password?
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
