import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Heading , Alert, AlertIcon } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail } from '../../redux/actions/userActions';

const PasswordForgetForm = () => {
  const dispatch = useDispatch();
  const { loading, error, serverResponseMsg, serverResponseStatus } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendResetEmail = () => {
    dispatch(sendResetEmail(email));
  };

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }}>
      <Stack spacing="8">
        <Box
          py={{ base: '0', md: '8' }}
          px={{ base: '4', md: '10' }}
          bg={{ base: 'transparent', md: 'bg-surface' }}
          boxShadow={{ base: 'none', md: 'md' }}
          borderRadius={{ base: 'none', md: 'xl' }}
        >
          <Stack spacing="6">
            <Heading size="md">Password Reset</Heading>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            {serverResponseStatus && (
              <Alert status={serverResponseStatus === 200 ? 'success' : 'error'}>
                <AlertIcon />
                {serverResponseMsg}
              </Alert>
            )}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <Button colorScheme="cyan" size="lg" fontSize="md" isLoading={loading} onClick={handleSendResetEmail}>
              Send Reset Email
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default PasswordForgetForm;
