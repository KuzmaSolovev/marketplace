import { useWeb3Actions, useWeb3State } from '@features/web3/context';
import ActionButton from '@components/Button';
import config from '@config';

import { CHAIN_ID_NAME_MAPPER } from '../constants';

const NetworkMissmatchPopup = () => {
  const { chainId } = useWeb3State();
  const { disconnect, changeNetwork } = useWeb3Actions();

  if (parseInt(chainId) === config.chainId || !chainId) return null;

  return (
    <div className="overlay">
      <div className="container">
        <h3 className="containerTitle">Wrong Network</h3>
        {CHAIN_ID_NAME_MAPPER[config.chainId] && (
          <p className="containerText">
            Change network to {CHAIN_ID_NAME_MAPPER[config.chainId]}
          </p>
        )}
        <div className="networkActionButtons">
          <ActionButton
            className="buttonSwitchNetwork"
            onClick={changeNetwork}
            label={`Switch to ${CHAIN_ID_NAME_MAPPER[config.chainId]}`}
          />
          <ActionButton
            className="buttonDisconnect"
            onClick={disconnect}
            label="Disconnect"
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkMissmatchPopup;
