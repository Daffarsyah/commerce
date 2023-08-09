import Footer from '@/components/layout/footer/footer';
import ProductView from 'components/product/product-view';
import { productQuery } from 'lib/sanity/queries';
import { clientFetch } from 'lib/sanity/sanity.client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface ProductPageParams {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const product = await clientFetch(productQuery, params);

  if (!product) return notFound();

  const { alt } = product.images[0] || '';
  const { url } = product.images[0].asset || {};
  const { width, height } = product.images[0].asset.metadata.dimensions;
  // const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    // @TODO ROBOTS SETTINGS???
    // robots: {
    //   index: indexable,
    //   follow: indexable,
    //   googleBot: {
    //     index: indexable,
    //     follow: indexable
    //   }
    // },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: ProductPageParams) {
  const product = await clientFetch(productQuery, params);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    // @TODO UPDATE TO STORM URL???
    image: product.images[0].asset.url
    // offers: {
    //   '@type': 'AggregateOffer',
    //   availability: product.availableForSale
    //     ? 'https://schema.org/InStock'
    //     : 'https://schema.org/OutOfStock',
    //   priceCurrency: product.priceRange.minVariantPrice.currencyCode,
    //   highPrice: product.priceRange.maxVariantPrice.amount,
    //   lowPrice: product.priceRange.minVariantPrice.amount
    // }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <ProductView product={product} relatedProducts={[]} />
      <Suspense>
        <Footer locale={params.locale} />
      </Suspense>
    </>
  );
}
