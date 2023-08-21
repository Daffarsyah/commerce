import HomePage from '@/components/pages/home-page';
import HomePagePreview from '@/components/pages/home-page-preview';
import { homePageQuery } from '@/lib/sanity/queries';
import { getHomePage } from '@/lib/sanity/sanity.fetch';
import { Metadata } from 'next';
import { LiveQuery } from 'next-sanity/preview/live-query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const homePage = await getHomePage(params.locale);

  if (!homePage) return notFound();

  return {
    title: homePage?.seo?.title || homePage.title,
    description: homePage?.seo?.description
  };
}
interface HomePageParams {
  params: {
    locale: string;
  };
}

export default async function IndexPage({ params }: HomePageParams) {
  // const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined;

  const data = await getHomePage(params.locale);

  if (!data && !draftMode().isEnabled) {
    notFound();
  }

  console.log('Preview:', draftMode().isEnabled);

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={homePageQuery}
      params={{ locale: params.locale }}
      initialData={data}
      as={HomePagePreview}
    >
      <HomePage data={data} />
    </LiveQuery>
  );
}
