import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertIcon, Box, Button, Container, FormControl, FormLabel, Input, Checkbox, Stack, Text , InputGroup, InputRightElement} from '@chakra-ui/react';
import { login } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoEye, IoEyeOff } from 'react-icons/io5'; // Import the icons
import Cookies from 'js-cookie';
import OAuthButtonGroup from '../components/authPages/OAuthButtonGroup';
import { useEffect } from 'react';


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedEmail = Cookies.get('rememberedEmail');
    if (savedEmail) {
      formik.setFieldValue('email', savedEmail);
      formik.setFieldValue('rememberMe', true);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,

    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(2, 'Password must be at least 8 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      dispatch(login(values.email, values.password));

       // Save email to cookie if "Remember Me" is checked
       if (values.rememberMe) {
        Cookies.set('rememberedEmail', values.email, { expires: 7 }); // Cookie expires in 7 days
      } else {
        Cookies.remove('rememberedEmail');
      }
    },
  });

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
              <Input id="email" type="email" {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && <Text color="red">{formik.errors.email}</Text>}
            </FormControl>
            <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.touched.password && formik.errors.password && (
                <Text color="red">{formik.errors.password}</Text>
              )}
            </FormControl>
            <Checkbox {...formik.getFieldProps('rememberMe')}>Remember Me</Checkbox>

            <Button
              colorScheme="cyan"
              size="lg"
              fontSize="md"
              isLoading={loading}
              onClick={formik.handleSubmit}
            >
              Sign in
            </Button>
            <Text fontSize="sm" color="blue.500" onClick={() => navigate('/PasswordForgetForm')}>
              Forgot Password?
            </Text>
            <Stack>
            <OAuthButtonGroup />
          </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
