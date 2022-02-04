import PropTypes from 'prop-types';

import types from '@shared/types/user';

import { useWeb3State } from '@features/web3/context';

import AccountPageHeader from '../AccountPageHeader';
import AccountNftList from '../AccountNftList';

const AccountNftGallery = ({ account, initialTab }) => {
  const { currentAddress } = useWeb3State();

  return (
    <>
      <AccountPageHeader account={account} />
      <AccountNftList
        isConnected={currentAddress}
        walletAddress={account.walletAddress}
        initialTab={initialTab}
      />
    </>
  );
};

AccountNftGallery.propTypes = {
  account: types.UserAccount,
  initialTab: PropTypes.string,
};

export default AccountNftGallery;
