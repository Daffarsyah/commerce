'use client';

import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import { useEffect, useRef, useState } from 'react';
import { getProductsInCollection, searchProducts } from './actions';

const ProductsList = ({
  initialProducts,
  pageInfo,
  searchParams,
  page
}: {
  initialProducts: Product[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
  page: 'search' | 'collection';
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [_pageInfo, setPageInfo] = useState(pageInfo);
  const lastElement = useRef(null);

  useEffect(() => {
    const lastElementRef = lastElement.current;

    const loadMoreProducts = async () => {
      const params = {
        searchParams,
        afterCursor: _pageInfo.endCursor
      };
      const { products, pageInfo } =
        page === 'collection'
          ? await getProductsInCollection(params)
          : await searchProducts(params);

      setProducts((prev) => [...prev, ...products]);
      setPageInfo({
        hasNextPage: pageInfo.hasNextPage,
        endCursor: pageInfo.endCursor
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 1 }
    );
    lastElementRef && observer.observe(lastElementRef);

    return () => {
      if (lastElementRef) {
        observer.unobserve(lastElementRef);
      }
    };
  }, [_pageInfo.endCursor, page, searchParams]);

  return (
    <>
      {products.map((product, index) => (
        <Grid.Item
          key={product.handle}
          className="animate-fadeIn"
          ref={index === products.length - 1 && _pageInfo.hasNextPage ? lastElement : undefined}
        >
          <GridTileImage
            alt={product.title}
            product={product}
            src={product.featuredImage?.url}
            fill
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            href={`/product/${product.handle}`}
          />
        </Grid.Item>
      ))}
    </>
  );
};

export default ProductsList;
