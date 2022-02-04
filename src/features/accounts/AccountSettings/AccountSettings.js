import clsx from 'clsx';

import { useState, useEffect } from 'react';

import AccountEditForm from '@features/accounts/AccountEditForm';
import AccountImageEditor from '@features/accounts/AccountImageEditor';
import Loader from '@components/Loader';

import { useWeb3State, useWeb3Actions } from '@features/web3/context';
import { metaMaskConnector } from '@features/web3/connectors';

import useFetchUserProfile from '@api/user/useFetchUserProfile';

import styles from './AccountSettings.module.scss';

const AccountSettings = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState({
    profileImage: '',
    bannerImage: '',
  });

  const { currentAddress, isConnectionLoading } = useWeb3State();
  const { connect } = useWeb3Actions();

  const { data: user, isSuccess } = useFetchUserProfile(currentAddress);

  useEffect(() => {
    if (!isConnectionLoading && !currentAddress) {
      connect(metaMaskConnector);
    }
  }, [isConnectionLoading, currentAddress, connect]);

  if (!isSuccess)
    return (
      <div className={styles.loadingWrapper}>
        <Loader />
      </div>
    );

  return (
    <section className={clsx('section section-top')}>
      <h1 className={styles.title}>Profile Settings</h1>
      <div className={styles.settings}>
        <AccountEditForm user={user} uploadedImageUrl={uploadedImageUrl} />
        <AccountImageEditor user={user} onImageUpload={setUploadedImageUrl} />
      </div>
    </section>
  );
};

export default AccountSettings;
