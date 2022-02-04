import { NextSeo } from 'next-seo';

import Layout from '@features/layout';
import LatestAuctionsCreated from '@features/home/LatestAuctionsCreated';
import HotAuctions from '@features/home/HotAuctions';
import NewAuctions from '@features/home/NewAuctions';

import { useSiteConfig } from '@shared/hooks';

const Home = () => {
  const config = useSiteConfig();
  return (
    <Layout>
      <NextSeo
        title={'Marketplace Home | Kitsumon'}
        openGraph={{
          title: 'Marketplace Home | Kitsumon',
          url: `${config.url}/`,
        }}
      />
      <LatestAuctionsCreated />
      <HotAuctions />
      <NewAuctions />
    </Layout>
  );
};

export default Home;
