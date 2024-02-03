import { useDispatch, useSelector } from 'react-redux';
import { LightMode, IconButton, Icon } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { addToFavorites, removeFromFavorites } from '../../redux/actions/productActions';

export const FavouriteButton = ({ productId }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.product);

  return (
    <LightMode>
      {favorites.includes(productId) ? (
        <IconButton
          isRound
          bg="white"
          color="red.500"
          colorScheme="cyan"
          size="sm"
          _hover={{
            transform: 'scale(1.1)',
          }}
          sx={{
            ':hover > svg': {
              transform: 'scale(1.1)',
            },
          }}
          transition="all 0.15s ease"
          icon={<Icon as={FiHeart} transition="all 0.15s ease" />}
          boxShadow="base"
          onClick={() => dispatch(removeFromFavorites(productId))}
        />
      ) : (
        <IconButton
          isRound
          bg="white"
          color="gray.900"
          size="sm"
          _hover={{
            transform: 'scale(1.1)',
          }}
          sx={{
            ':hover > svg': {
              transform: 'scale(1.1)',
            },
          }}
          transition="all 0.15s ease"
          icon={<Icon as={FiHeart} transition="all 0.15s ease" />}
          boxShadow="base"
          onClick={() => dispatch(addToFavorites(productId))}
        />
      )}
    </LightMode>
  );
};
