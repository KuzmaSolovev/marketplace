import PropTypes from 'prop-types';

import { NextSeo } from 'next-seo';
import { dehydrate, QueryClient } from 'react-query';
import { useRouter } from 'next/router';

import Layout from '@features/layout';
import BuyNft from '@features/buy/BuyNft';

import marketApi from '@api/market/market';
import { LATEST_ASK_BY_TOKEN_ID } from '@api/constants/queryKeys';

import { useSiteConfig } from '@shared/hooks';

const BuyItem = () => {
  const {
    query: { tokenAddress, tokenId },
  } = useRouter();

  const config = useSiteConfig();
  return (
    <Layout>
      <NextSeo
        title={'Buy now Nft | Kitsumon'}
        openGraph={{
          title: 'Buy now Nft | Kitsumon',
          url: `${config.url}/buy-item/${tokenId}`,
        }}
      />
      <BuyNft tokenAddress={tokenAddress} tokenId={tokenId} />
    </Layout>
  );
};

BuyItem.propTypes = {
  nft: PropTypes.shape({
    walletAddress: PropTypes.string,
  }),
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { tokenId } = params;
  const queryClient = new QueryClient();

  const item = await queryClient.fetchQuery(
    [LATEST_ASK_BY_TOKEN_ID, tokenId],
    () => marketApi.getLatestAsks({ tokenId }),
  );

  if (!item) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
  return {
    props: {
      nft: item[0],
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

export default BuyItem;
