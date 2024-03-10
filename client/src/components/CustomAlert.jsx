import React, { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

const CustomAlert = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 300); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      p={4}
      bgColor="blue.500"
      color="white"
      borderRadius="md"
      boxShadow="md"
      display={isOpen ? 'block' : 'none'}
    >
      <Text>{message}</Text>
      <Button
        ml={4}
        onClick={() => {
          setIsOpen(false);
          onClose();
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default CustomAlert;
