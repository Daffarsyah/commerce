import { useMemo } from 'react'
import type { SWRHook } from '@commerce/utils/types'
import useWishlist from '@commerce/wishlist/use-wishlist'
import type { UseWishlist } from '@commerce/wishlist/use-wishlist'
import type { GetWishlistHook } from '@commerce/types/wishlist'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import type { GraphQLFetcherResult } from '@commerce/api'
import type { Wishlist } from '@spree/storefront-api-v2-sdk/types/interfaces/Wishlist'
import ensureIToken from '../utils/tokens/ensure-itoken'
import normalizeWishlist from '../utils/normalizations/normalize-wishlist'

export default useWishlist as UseWishlist<typeof handler>

export const handler: SWRHook<GetWishlistHook> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    url: 'wishlists',
    query: 'default',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useWishlist fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    // TODO: Optimize with includeProducts once the wishlists
    // behavior stabilizes.

    const token: IToken | undefined = ensureIToken()

    const { data: spreeWishlistsDefaultSuccessResponse } = await fetch<
      GraphQLFetcherResult<Wishlist>
    >({
      variables: {
        methodPath: 'wishlists.default',
        arguments: [
          token,
          {
            include: [
              'wished_items',
              'wished_items.variant',
              'wished_items.variant.product',
              'wished_items.variant.product.primary_variant',
              'wished_items.variant.product.images',
              'wished_items.variant.product.option_types',
              'wished_items.variant.product.variants',
              'wished_items.variant.product.variants.option_values',
            ].join(','),
          },
        ],
      },
    })

    return normalizeWishlist(
      spreeWishlistsDefaultSuccessResponse,
      spreeWishlistsDefaultSuccessResponse.data
    )
  },
  useHook: ({ useData }) => {
    const useWrappedHook: ReturnType<SWRHook<GetWishlistHook>['useHook']> = (
      input
    ) => {
      const response = useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })

      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.items?.length || 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    }

    return useWrappedHook
  },
}
