import React from 'react'
import {IconButton , Box, HStack, Icon ,Stack, Text, useColorModeValue as mode , useDisclosure, Flex} from '@chakra-ui/react';
import {useEffect} from 'react';
import {BsPhoneFlip} from 'react-icons/bs';
import {Link as ReactLink} from 'react-router-dom';
import NavLink from './NavLink'; // Corrected import
import ColorModeToggle from './ColorModeToggle'; // Corrected import
import {BiUserCheck} from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux';
import {MdOutlineFavorite,MdOutlineFavoriteBorder} from 'react-icons/md'
import { toggleFavorites } from '../redux/actions/productActions';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

const Links = [
  { name: 'Products', route: '/products' },
  { name: 'Hot Deals', route: '/hot-deals' },
  { name: 'Contact', route: '/contact' },
  { name: 'Services', route: '/services' },
];

const Header = () => {
  const dispatch = useDispatch();
  const {favoritesToggled} = useSelector((state) => state.product)
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Your useEffect logic here
  }, []); // Removed unnecessary dependencies

  return (
    <Box bg={mode('cyan.300', 'gray.900')} p='4'>
      <Flex h='10' alignItems='center' justifyContent='space-between'>
        <Flex display={{ base: 'flex', md: 'none' }} alignItems='center'>
          <IconButton bg='parent' size='md' icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>} onClick={isOpen ? onClose : onOpen} />
        </Flex>
        <HStack spacing='8' alignItems='center'>
          <Box alignItems='center' display='flex' as={ReactLink} to='/'>
            <Icon as={BsPhoneFlip} h='6' w='6' color={mode('black', 'white')} />
            <Text as='b'>Maaleena</Text>
          </Box>
          <HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink route={link.route} key={link.route} >
                <Text fontWeight='medium'>{link.name}</Text>
              </NavLink>
            ))}
            <ColorModeToggle /> 
            {favoritesToggled ? (
                <IconButton onClick= {() => dispatch(toggleFavorites(false))} icon ={<MdOutlineFavorite size='20px'/>} variant='ghost'/>
            ):(
               <IconButton onClick= {() => dispatch(toggleFavorites(true))} icon ={<MdOutlineFavoriteBorder size='20px'/>} variant='ghost'/>

            )}
          </HStack>
        </HStack>
        <Flex alignItems='center'>
              <BiUserCheck/>
        </Flex>
      </Flex>
      <Box display='flex'>
              {isOpen && (
                <Box pb='4' display={{md:'none'}}>
                  <Stack as='nav' spacing='4'>
                    {Links.map((link) => (
                      <NavLink route={link.route} key={link.route} >
                      <Text fontWeight='medium'>{link.name}</Text>
                    </NavLink>
                    ))}
                  </Stack>
                  <ColorModeToggle/>

                  {favoritesToggled ? (
                    <IconButton onClick= {() => dispatch(toggleFavorites(false))} icon ={<MdOutlineFavorite size='20px'/>} variant='ghost'/>
                    ):(
                  <IconButton onClick= {() => dispatch(toggleFavorites(true))} icon ={<MdOutlineFavoriteBorder size='20px'/>} variant='ghost'/>
                   )}
                </Box>
              )}
        </Box>
    </Box>
  );
};

export default Header;
