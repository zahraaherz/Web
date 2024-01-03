import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
  } from '@chakra-ui/react';
  import { Logo } from '../components/Logo';
  import PasswordField  from '../components/PasswordField';
  import { useState } from 'react';
  import { useDispatch } from 'react-redux';
  import { sendResetEmail } from '../redux/actions/userActions';

  
  export const PasswordForgetForm = () => {

    const dispatch = useDispatch()
    const {email , setEmail} = useState('')
    const handelChange = (event) => { 
        setEmail(event.target.value);
    }

    return (<Container
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
            >Forget Password
            </Heading>
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
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" value={email} onChange={(e) => handelChange(e)}/>
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button onClick={() => dispatch(sendResetEmail(email))}>Send Reset Email</Button> 
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>);
  }

  export default PasswordForgetForm;