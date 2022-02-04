import { useWeb3Actions } from '@features/web3/context';
import { metaMaskConnector } from '@features/web3/connectors';

import ActionButton from '@components/Button';

import styles from './AccountConnectMessage.module.scss';

const AccountConnectMessage = () => {
  const { connect } = useWeb3Actions();
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Not connected</h3>
      <p className={styles.description}>
        To see on-sale/owned nfts by this user please connect your wallet.
      </p>
      <ActionButton
        className={styles.connectButton}
        label="Connect"
        onClick={() => connect(metaMaskConnector)}
      />
    </div>
  );
};

export default AccountConnectMessage;
