import commerce from '@lib/api/commerce'
import getCategories, { Category } from '../utils/get-categories'
import getVendors, { Brands } from '../utils/get-vendors'
import { ReactionCommerceConfig } from '../api'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: Brands
  }
> = T

const getSiteInfo = async (options?: {
  variables?: any
  config: ReactionCommerceConfig
  preview?: boolean
}): Promise<GetSiteInfoResult> => {
  let { config } = options ?? {}

  config = commerce.getConfig(config)

  const categories = await getCategories(config)
  const brands = await getVendors(config)

  return {
    categories,
    brands,
  }
}

export default getSiteInfo
