import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'

import {
  CollectionEdge,
  GetAllProductsQuery,
  Product as ShopifyProduct,
  ProductEdge,
} from '../schema'
import {
  getAllProductsQuery,
  getCollectionProductsQuery,
  getSearchVariables,
  normalizeProduct,
} from '../utils'

import { Product } from '@commerce/types'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: string
  brandId?: string
  sort?: string
}

export type SearchProductsData = {
  products: Product[]
  found: boolean
}

export const handler: SWRHook<
  SearchProductsData,
  SearchProductsInput,
  SearchProductsInput
> = {
  fetchOptions: {
    query: getAllProductsQuery,
  },
  async fetcher({ input, options, fetch }) {
    const { categoryId, brandId } = input
    const method = options?.method
    const variables = getSearchVariables(input)
    let products

    // change the query to getCollectionProductsQuery when categoryId is set
    if (categoryId) {
      const data = await fetch<CollectionEdge>({
        query: getCollectionProductsQuery,
        method,
        variables,
      })
      // filter on client when brandId & categoryId are set since is not available on collection product query
      products = brandId
        ? data.node.products.edges.filter(
            ({ node: { vendor } }: ProductEdge) =>
              vendor.replace(/\s+/g, '-').toLowerCase() === brandId
          )
        : data.node.products.edges
    } else {
      const data = await fetch<GetAllProductsQuery>({
        query: options.query,
        method,
        variables,
      })
      products = data.products.edges
    }

    return {
      products: products?.map(({ node }) =>
        normalizeProduct(node as ShopifyProduct)
      ),
      found: !!products?.length,
    }
  },
  useHook: ({ useData }) => (input = {}) => {
    return useData({
      input: [
        ['search', input.search],
        ['categoryId', input.categoryId],
        ['brandId', input.brandId],
        ['sort', input.sort],
      ],
      swrOptions: {
        revalidateOnFocus: false,
        ...input.swrOptions,
      },
    })
  },
}
