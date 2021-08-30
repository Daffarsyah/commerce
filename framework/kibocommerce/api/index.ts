import type { CommerceAPI, CommerceAPIConfig } from '@commerce/api'
import { getCommerceApi as commerceApi } from '@commerce/api'
import createFetchGraphqlApi from './utils/fetch-graphql-api'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'
import createFetchStoreApi from './utils/fetch-store-api'
import type { RequestInit } from '@vercel/fetch'

export interface KiboCommerceConfig extends CommerceAPIConfig {
  apiHost?: string
  clientId?: string
  sharedSecret?: string
  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

const config: KiboCommerceConfig = {
  commerceUrl: process.env.KIBO_API_URL || '',
  apiToken: process.env.KIBO_API_TOKEN || '',
  cartCookie: process.env.KIBO_CART_COOKIE || '',
  customerCookie: process.env.KIBO_CUSTOMER_COOKIE || '',
  cartCookieMaxAge: 2592000,
  fetch: createFetchGraphqlApi(() => getCommerceApi().getConfig()),
  // REST API
  apiHost: process.env.KIBO_API_HOST || '',
  clientId: process.env.KIBO_CLIENT_ID || '',
  sharedSecret: process.env.KIBO_SHARED_SECRET || '',
  storeApiFetch: createFetchStoreApi(() => getCommerceApi().getConfig()),
}

const operations = {
  getAllPages,
  getPage,
  getSiteInfo,
  getCustomerWishlist,
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type KiboCommerceProvider = typeof provider
export type KiboCommerceAPI<
  P extends KiboCommerceProvider = KiboCommerceProvider
> = CommerceAPI<P | any>

export function getCommerceApi<P extends KiboCommerceProvider>(
  customProvider: P = provider as any
): KiboCommerceAPI<P> {
  return commerceApi(customProvider as any)
}
