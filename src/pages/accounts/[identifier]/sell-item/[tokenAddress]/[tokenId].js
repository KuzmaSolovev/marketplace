import PropTypes from 'prop-types';

import { NextSeo } from 'next-seo';
import { dehydrate, QueryClient } from 'react-query';

import Layout from '@features/layout';
import AccountPageHeader from '@features/accounts/AccountPageHeader';
import SellNft from '@features/sell/SellNft';

import useFetchUserProfile from '@api/user/useFetchUserProfile';

import mediaApi from '@api/media/media';
import userApi from '@api/user/user';

import { useSiteConfig } from '@shared/hooks';

const SellItem = ({ address, tokenAddress, tokenId }) => {
  const config = useSiteConfig();
  const { data: account } = useFetchUserProfile(address);
  return (
    <Layout>
      <NextSeo
        title={'Sell NFT | Kitsumon'}
        openGraph={{
          title: 'Sell NFT | Kitsumon',
          url: `${config.url}/accounts/${address}/sell-item${tokenId}`,
        }}
      />
      <AccountPageHeader account={account} />
      <SellNft
        tokenOwner={address}
        tokenAddress={tokenAddress}
        tokenId={tokenId}
      />
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
  const { identifier, tokenAddress, tokenId } = params;
  const queryClient = new QueryClient();

  const metadata = await queryClient.fetchQuery(
    ['token-metadata', tokenId],
    () => mediaApi.getMetadata({ tokenId, contractAddress: tokenAddress }),
  );

  const user = identifier.startsWith('0x')
    ? await userApi.getUserProfile(identifier).catch((err) => err)
    : await userApi
        .getProfileForUsername(identifier.toLowerCase())
        .catch((err) => err);

  queryClient.setQueryData(
    ['user', user?.walletAddress || identifier],
    user || {
      walletAddress: identifier,
      username: '',
      profileImage: '',
      profileBanner: '',
    },
  );

  if ((!user.walletAddress && !identifier) || !metadata) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
  return {
    props: {
      address: user ? user.walletAddress : identifier,
      tokenId,
      tokenAddress,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

SellItem.propTypes = {
  tokenId: PropTypes.string,
  tokenAddress: PropTypes.string,
  address: PropTypes.string,
};

export default SellItem;
