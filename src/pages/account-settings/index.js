import { NextSeo } from 'next-seo';

import { useSiteConfig } from '@shared/hooks';

import Layout from '@features/layout';
import AccountSettings from '@features/accounts/AccountSettings';

const ProfileSettings = () => {
  const config = useSiteConfig();
  return (
    <Layout>
      <NextSeo
        title={'Marketplace Settings | Kitsumon'}
        openGraph={{
          title: 'Marketplace Settings | Kitsumon',
          url: `${config.url}/account-settings`,
        }}
      />
      <AccountSettings />
    </Layout>
  );
};

export default ProfileSettings;
