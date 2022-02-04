import { useState, useEffect } from 'react';

import { useWeb3State } from '@features/web3/context';
import ActionButton from '@components/Button';

const ProviderPopup = () => {
  const { providerInstalled } = useWeb3State();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (providerInstalled === false) setOpen(true);
    else setOpen(false);
  }, [providerInstalled]);

  return open ? (
    <div className="overlay">
      <div className="container">
        <h3 className="containerTitle">Metamask not installed!</h3>
        <p className="containerText">
          Web3Provider not detected, download MetaMask
          <a
            href="https://metamask.io/download"
            target="_blank"
            rel="noopener noreferrer">
            {' '}
            here{' '}
          </a>
          and reload page.
        </p>
        <ActionButton
          className="buttonDisconnect"
          onClick={() => setOpen(false)}
          label="Close"
        />
      </div>
    </div>
  ) : null;
};

export default ProviderPopup;
