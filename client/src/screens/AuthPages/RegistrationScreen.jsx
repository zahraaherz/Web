import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
	useToast,
  } from '@chakra-ui/react';
  import { Formik, Field, Form } from 'formik';
  import * as Yup from 'yup';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link as ReactLink, useNavigate } from 'react-router-dom';
  import { register } from '../../redux/actions/userActions';
  import { useEffect } from 'react';

  const RegistrationScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const { loading, error, userInfo } = useSelector((state) => state.user);
  
  	const initialValues = {
    	name: '',
    	email: '',
    	password: '',
   		confirmPassword: '',
 	};

	const validationSchema = Yup.object({
		name: Yup.string().required('Name is required'),
		email: Yup.string()
			.email('Invalid email address')
			.matches(
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
				'Invalid email address'
			)
			.required('Email is required'),
		password: Yup.string()
			.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character'
			)
			.required('Password is required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Confirm Password is required'),
	});

	const handleSubmit = async (values) => {
		const { name, email, password } = values;
		dispatch(register(name, email, password));
	};
	useEffect(() => {
		if (!loading && !error && userInfo) {
		  // Registration successful, redirect to products page
		  navigate('/products');
		//   if (userInfo) {
		// 	toast({
		// 	  description: userInfo.firstLogin ? 'Account created. Welcome aboard.' : `Welcome back ${userInfo.name}`,
		// 	  status: 'success',
		// 	  isClosable: true,
		// 	});
		//   }
		}
	  }, [loading, error, userInfo, navigate, toast]);
	  
  
	return (
	  <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
		<Stack spacing="8">
		  <Box
			py={{ base: '0', sm: '8' }}
			px={{ base: '4', sm: '10' }}
			bg={{ base: 'transparent', sm: 'bg.surface' }}
			boxShadow={{ base: 'none', sm: 'md' }}
			borderRadius={{ base: 'none', sm: 'xl' }}
		  >
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			  <Form>
				<Stack spacing="6">
				<Field name="name">
					  {({ field, form }) => (
						<FormControl isInvalid={form.errors.name && form.touched.name}>
						  <FormLabel htmlFor="name">Name</FormLabel>
						  <Input {...field} id="name" type="text" />
						  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
						</FormControl>
					  )}
					</Field>

				  <Field name="email">
					{({ field, form }) => (
					  <FormControl isInvalid={form.errors.email && form.touched.email}>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input {...field} id="email" type="email" />
						<FormErrorMessage>{form.errors.email}</FormErrorMessage>
					  </FormControl>
					)}
				  </Field>
  
				  <Field name="password">
					{({ field, form }) => (
					  <FormControl isInvalid={form.errors.password && form.touched.password}>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input {...field} id="password" type="password" />
						<FormErrorMessage>{form.errors.password}</FormErrorMessage>
					  </FormControl>
					)}
				  </Field>
  
				  <Field name="confirmPassword">
					{({ field, form }) => (
					  <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
						<FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
						<Input {...field} id="confirmPassword" type="password" />
						<FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
					  </FormControl>
					)}
				  </Field>
				</Stack>
				<HStack justify="space-between">

				  <Checkbox defaultChecked>Remember me</Checkbox>
				</HStack>
				<Stack spacing="6">
				  <Button type="submit" isLoading={loading}>
					Sign Up
				  </Button>
				</Stack>
			  </Form>
			</Formik>
		  </Box>
		</Stack>
	  </Container>
	);
  };
  
  export default RegistrationScreen;
  