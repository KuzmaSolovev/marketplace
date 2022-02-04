import { NextSeo } from 'next-seo';

import Layout from '@features/layout';
import ExploreNfts from '@features/explore/ExploreNfts';

import { useSiteConfig } from '@shared/hooks';

const Explore = () => {
  const config = useSiteConfig();

  return (
    <Layout>
      <NextSeo
        title={'Marketplace Explore | Kitsumon'}
        openGraph={{
          title: 'Marketplace Explore | Kitsumon',
          url: `${config.url}/explore`,
        }}
      />
      <ExploreNfts />
    </Layout>
  );
};

export default Explore;
