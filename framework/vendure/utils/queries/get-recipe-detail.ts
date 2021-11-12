export const getRecipeDetailQuery = /* GraphQL */ `
query getRecipe($slug: String ){
  recipe(slug:$slug){
    id
     featuredAsset {
      preview
    }
    assets{
      name
      preview
    }   
    translations{
      title
      slug
      description
      content
    }
    ingredients{
      id
      name
      slug
      featuredAsset{
        preview
      }
      variants{
        id
        name
        priceWithTax
        currencyCode
      }
      collections {
        id
        name
      }
      facetValues {
        id
        code
        name
      }
    }
    recommendedRecipes{
      id
      title
      slug
      description
      featuredAsset{
        preview
      }
    }
  }
}
`