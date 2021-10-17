import type { AddItemHook } from '@commerce/types/cart'
import type { MutationHook } from '@commerce/utils/types'

import { useCallback } from 'react'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import { normalizeCart } from '../utils/normalize-cart'
import useCart from './use-cart'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: 'cart',
    method: 'add',
  },
  async fetcher({ input: item, options, fetch }) {
    const [variantGroup, variantOption] = item.variantId.split('-')
    const variables = [
      item.productId,
      item?.quantity || 1,
      {
        [variantGroup]: variantOption,
      },
    ]
    const { cart } = await fetch({
      query: options.query,
      method: options.method,
      variables,
    })
    return normalizeCart(cart)
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useCart()

      return useCallback(
        async function addItem(input) {
          const cart = await fetch({ input })
          await mutate(cart, false)
          return cart
        },
        [mutate]
      )
    },
}
