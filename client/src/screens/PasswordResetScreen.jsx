import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { resetPassword } from '../redux/actions/userActions';

const ResetPasswordForm = ({ token }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { loading, error, serverStatus, serverMsg } = useSelector((state) => state.user);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Additional validation if needed
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    dispatch(resetPassword(password, token));
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={8} boxShadow="md" rounded="md">
      <form onSubmit={handlePasswordSubmit}>
        <FormControl mb={4}>
          <FormLabel>New Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" isLoading={loading}>
          Reset Password
        </Button>

        {error && (
          <Text mt={4} color="red.500">
            {error}
          </Text>
        )}

        {serverStatus === true && (
          <Text mt={4} color="green.500">
            {serverMsg}
          </Text>
        )}
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
