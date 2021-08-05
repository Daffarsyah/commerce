import { cartPayloadFragment } from '@framework/utils/queries/get-cart-query'

const setShippingAddressOnCartMutation = `
  mutation setShippingAddressOnCartMutation($input: SetShippingAddressOnCartInput!) {
    setShippingAddressOnCart(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`

export default setShippingAddressOnCartMutation
