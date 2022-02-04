import detectEthereumProvider from '@metamask/detect-provider';

const connect = async () => {
  const provider = await detectEthereumProvider({ mustBeMetaMask: true });
  try {
    if (provider === window.ethereum) {
      await provider.request({ method: 'eth_requestAccounts' });
      return provider;
    }
  } catch (error) {
    throw new Error('User Rejected');
  }

  throw new Error('No MetaMask found');
};

export default {
  id: 'metamask',
  connect,
};
