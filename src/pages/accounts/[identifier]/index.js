import PropTypes from 'prop-types';

import { NextSeo } from 'next-seo';
import { QueryClient, dehydrate } from 'react-query';

import Layout from '@features/layout';
import AccountNftGallery from '@features/accounts/AccountNftGallery';
import { TabNames } from '@features/accounts/constants';

import userApi from '@api/user/user';

import { useSiteConfig } from '@shared/hooks';
import useFetchUserProfile from '@api/user/useFetchUserProfile';

const INITIAL_TAB = TabNames.AUCTION;

const UserAccount = ({ address }) => {
  const config = useSiteConfig();

  const { data: account } = useFetchUserProfile(address);

  return (
    <Layout>
      <NextSeo
        title={'Marketplace My Profile | Kitsumon'}
        openGraph={{
          title: 'Marketplace My Profile | Kitsumon',
          url: `${config.url}accounts/${
            account.displayName || account.address
          }`,
        }}
      />
      <AccountNftGallery account={account} initialTab={INITIAL_TAB} />
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps(ctx) {
  const { identifier } = ctx.params;
  const queryClient = new QueryClient();

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

  if (!user.walletAddress && !identifier) {
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
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

UserAccount.propTypes = {
  address: PropTypes.any,
};

export default UserAccount;
