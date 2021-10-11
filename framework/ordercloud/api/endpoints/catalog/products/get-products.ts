import { Product } from '@commerce/types/product'
import { RawProduct } from '@framework/types/product'
import { normalize as normalizeProduct } from '@framework/utils/product'
import { ProductsEndpoint } from '.'


const SORT: { [key: string]: string | undefined } = {
  latest: 'id',
  trending: 'total_sold',
  price: 'price',
}

// Return current cart info
const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  req,
  res,
  body: { search, categoryId, brandId, sort },
  config: { restBuyerFetch, cartCookie, tokenCookie },
}) => {
  console.log("categoryId", categoryId)

  //Use a dummy base as we only care about the relative path
  const url = new URL('/me/products', 'http://a')

  if (search) { 
    url.searchParams.set('search', search) 
  }
  if (categoryId) {
    url.searchParams.set('categoryID', String(categoryId)) 
  }

  // Get token from cookies
  const token = req.cookies[tokenCookie];

  var rawProducts = await restBuyerFetch(
    'GET',
    url.pathname + url.search,
    null,
    { token }
  );

  const products = rawProducts.Items.map(normalizeProduct);
  const found = rawProducts?.Items?.length > 0;

  res.status(200).json({ data: { products, found } })
}

export default getProducts

