import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
    Alert,
    AlertDescription,
    AlertTitle,
    AlertIcon,
    useToast
  } from '@chakra-ui/react';
  import { Logo } from '../components/Logo';
  import { OAuthButtonGroup } from '../components/OAuthButtonGroup';
  import PasswordField  from '../components/PasswordField';
  import { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import {Link as ReactLink, useLocation , useNavigate} from 'react-router-dom';
  import * as Yup from 'yup';
  import { Formik } from 'formik';
  import { login } from '../redux/actions/userActions';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const redirect = '/products';
  const toast = useToast();

  const { loading, error, userInfo, serverMsg } = useSelector((state) => state.user);
  const [showPasswordReset] = useState(false);

  useEffect(() => {
    if (userInfo) {
      if (location.state?.form) {
        navigation(location.state.form);
      } else {
        navigation('/products');
      }
      toast({
        description: 'Login Successful',
        status: 'success',
        isClosable: true,
      });
    }
    if (serverMsg) {
      toast({
        description: `${serverMsg}`,
        status: 'success',
        isClosable: true,
      });
    }
  }, [userInfo, redirect, navigation, location.state, toast, showPasswordReset, serverMsg]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email.').required('An email address is required.'),
        password: Yup.string()
          .min(1, 'Password is too short - must contain at least 1 character.')
          .required('Password is required.'),
      })}
      onSubmit={(values) => {
        dispatch(login(values.email, values.password));
      }}
    >
      {(formik) => (
        <div>
          {/* Wrap your JSX in a container (div in this case) */}
          <Container
            maxW="lg"
            py={{
              base: '12',
              md: '24',
            }}
            px={{
              base: '0',
              sm: '8',
            }}
          >
            <Stack spacing="8">
              <Stack spacing="6">
                <Logo />
                <Stack
                  spacing={{
                    base: '2',
                    md: '3',
                  }}
                  textAlign="center"
                >
                  <Heading
                    size={{
                      base: 'xs',
                      md: 'sm',
                    }}
                  >
                    Log in to your account
                  </Heading>
                  <Text color="fg.muted">
                    Don't have an account? <Link href="/registration">Sign up</Link>
                  </Text>
                </Stack>
              </Stack>
              <Box
                py={{
                  base: '0',
                  sm: '8',
                }}
                px={{
                  base: '4',
                  sm: '10',
                }}
                bg={{
                  base: 'transparent',
                  sm: 'bg.surface',
                }}
                boxShadow={{
                  base: 'none',
                  sm: 'md',
                }}
                borderRadius={{
                  base: 'none',
                  sm: 'xl',
                }}
              >
                <Stack spacing="6" onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert
                      status="error"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <AlertIcon />
                      <AlertTitle>We are sorry!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="email" >Email</FormLabel>
                      <Input id="email" type="email" name='email'/>
                    </FormControl>
                    <PasswordField  type='password' name='password'/>
                  </Stack>
                  <HStack justify="space-between">
                    <Checkbox defaultChecked>Remember me</Checkbox>
                    <Button
                      as={ReactLink} 
                      to='/PasswordForgetForm'
                      variant="link"
                      size="sm"

                    >
                      Forgot password?
                    </Button>
                  </HStack>
                  <Stack spacing="6">
                    <Button isLoading={loading} type="submit">
                      Sign in
                    </Button>
                    <HStack>
                      <Divider />
                      <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                        or continue with
                      </Text>
                      <Divider />
                    </HStack>
                    <OAuthButtonGroup />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </div>
      )}
    </Formik>
  );
};

export default LoginScreen;
