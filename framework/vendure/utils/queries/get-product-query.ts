export const getProductQuery = /* GraphQL */ `
  query getProduct($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      assets {
        id
        preview
        name
      }
      variants {
        id
        name
        priceWithTax
        currencyCode
        options {
          id
          name
          code
          groupId
          group {
            id
            options {
              name
            }
          }
        }
        customFields{
          oldPrice
          discount
        }
      }
      optionGroups {
        id
        code
        name
        options {
          id
          name
        }
      }
      facetValues {
        id
      }
      collections {
        id
        name
      }
    }
  }
`
export const getProductDetailQuery = /* GraphQL */ `
  query GetProductDetail($slug: String! = "hand-trowel") {
  product(slug: $slug) {
    name
    description
    variants {
      price
      priceWithTax
    }
    assets {
      preview
      name
    }
  }
}
`