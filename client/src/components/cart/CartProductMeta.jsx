import {
    Box,
    HStack,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { FiGift } from 'react-icons/fi'
  import React, { useState  } from 'react';

  export const CartProductMeta = (props) => {
    const { isGiftWrapping = true, image, name, description } = props
    const [isShown, setIsShown] = useState(false);
    // console.log('Image Prop:', props.image);
    // console.log('CartProductMeta Props:', props);

    return (
      <Stack direction="row" spacing="5" width="full">
        <Image
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image?.[isShown && image.length === 2 ? 1 : 0]}
          alt={name}
          draggable="false"
          loading="lazy"
          fallback={<Box>Image failed to load</Box>}

        />

        {/* <AspectRatio ratio={4 / 3}>
          <Image
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            src={product.images?.[isShown && product.images.length === 2 ? 1 : 0]}
            alt={product.name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={{ base: 'md', md: 'xl' }}
          /> */}
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{name}</Text>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              {description}
            </Text>
          </Stack>
          {isGiftWrapping && (
            <HStack spacing="1" mt="3" color={mode('gray.600', 'gray.400')}>
              <Icon as={FiGift} boxSize="4" />
              <Link fontSize="sm" textDecoration="underline">
                Add gift wrapping
              </Link>
            </HStack>
          )}
        </Box>
      </Stack>
    )
  }