import React from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { googleLogin } from '../../redux/actions/userActions'; // Import your OAuthButtonGroup and googleLogin functions
import { Box, Heading, Container, Button ,ButtonGroup,VisuallyHidden} from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleIcon } from './ProviderIcons'; // Assuming you have a GoogleIcon component
import axios from 'axios';

const OAuthButtonGroup = () => {
  const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.user);


	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			const userInfo = await axios
				.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: { Authorization: `Bearer ${response.access_token}` },
				})
				.then((res) => res.data);
			const { sub, email, name, picture } = userInfo;
			dispatch(googleLogin(sub, email, name, picture));
		},
	});


  return (
    <Container textAlign="center" marginTop="4">
      <Button
        size="lg"
        fontSize="md"
        isLoading={loading}
        loadingText="Signing In..."
        colorScheme="cyan" // You can customize the color scheme
        onClick={handleGoogleLogin}
        _hover={{ bg: 'cyan.600' }} // Customize hover effect
      >
        <VisuallyHidden>Sign in with Google</VisuallyHidden>
        <GoogleIcon />
        Sign in with Google
      </Button>
    </Container>
  );

};

export default OAuthButtonGroup;
