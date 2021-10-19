import { Asset } from '../../vendure/schema.d';

export type Collection = {
  id: string
  name: string
  slug: string
  description: string
  featuredAsse: Asset
  asset: Asset[]
}

export type SearchCollectionsBody = {
  search?: string
  sort?: string
  locale?: string
}

export type CollectionTypes = {
  collection: Collection
  searchBody: SearchCollectionsBody
}

export type SearchCollectionsHook<T extends CollectionTypes = CollectionTypes> = {
  data: {
    collections: T['collection'][]
    found: boolean
  }
  body: T['searchBody']
  input: T['searchBody']
  fetcherInput: T['searchBody']
}

export type CollectionsSchema<T extends CollectionTypes = CollectionTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getCollections: SearchCollectionsHook<T>
    }
  }
}


export type GetAllCollectionsOperation<T extends CollectionTypes = CollectionTypes> = {
  data: { collections: T['collection'][] }
  variables: {
    ids?: string[]
    first?: number
  }
}

export type GetCollectionOperation<T extends CollectionTypes = CollectionTypes> = {
  data: { collection?: T['collection'] }
  variables: { code: string; } | { code?: never; }
}