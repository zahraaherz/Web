import { HStack, Text, useColorModeValue as mode } from '@chakra-ui/react'

// export function formatPrice(value, opts = {}) {
//   const { locale = 'BD', currency = 'BD' } = opts
// //   const formatter = new Intl.NumberFormat(locale, {
// //     currency,
// //     style: 'currency',
// //     maximumFractionDigits: 2,
// //   })
//   return format(value)
// }

export function formatPrice(value, currency = 'BHD') {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value);
  }

export const PriceTag = (props) => {
  const { price, salePrice, rootProps, priceProps, salePriceProps } = props
  return (
    <HStack spacing="1" {...rootProps}>
      <Price isOnSale={!!salePrice} textProps={priceProps}>
      {formatPrice(price)}
      </Price>
      {salePrice && (
        <SalePrice {...salePriceProps}>
          {formatPrice(price)}
        </SalePrice>
      )}
    </HStack>
  )
}
const Price = (props) => {
  const { isOnSale, children, textProps } = props
  const defaultColor = mode('gray.700', 'gray.400')
  const onSaleColor = mode('gray.400', 'gray.700')
  const color = isOnSale ? onSaleColor : defaultColor
  return (
    <Text
      as="span"
      fontWeight="medium"
      color={color}
      textDecoration={isOnSale ? 'line-through' : 'none'}
      {...textProps}
    >
      {children}
    </Text>
  )
}
const SalePrice = (props) => (
  <Text as="span" fontWeight="semibold" color={mode('gray.800', 'gray.100')} {...props} />
)