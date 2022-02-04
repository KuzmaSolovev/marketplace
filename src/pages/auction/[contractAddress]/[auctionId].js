import { NextSeo } from 'next-seo';
import { dehydrate, QueryClient } from 'react-query';
import { useRouter } from 'next/router';

import Layout from '@features/layout';
import AuctionDetails from '@features/auction/AuctionDetails';

import auctionApi from '@api/auction/auction';
import { LATEST_AUCTION_EVENT } from '@api/constants/queryKeys';

import { useSiteConfig } from '@shared/hooks';

const Auction = () => {
  const {
    query: { auctionId, contractAddress },
  } = useRouter();

  const config = useSiteConfig();
  return (
    <Layout>
      <NextSeo
        title={'Marketplace Nft | Kitsumon'}
        openGraph={{
          title: 'Marketplace Home | Kitsumon',
          url: `${config.url}/${auctionId}`,
        }}
      />
      <AuctionDetails contractAddress={contractAddress} auctionId={auctionId} />
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { contractAddress, auctionId } = params;
  const queryClient = new QueryClient();

  const auction = await queryClient.fetchQuery(
    [LATEST_AUCTION_EVENT, auctionId],
    () =>
      auctionApi.getLatestAuctionEventsByAuctionId({
        auctionId,
        contractAddress,
      }),
  );

  if (!auction) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

export default Auction;
