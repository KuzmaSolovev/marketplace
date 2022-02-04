import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { providers } from 'ethers';
import PropTypes from 'prop-types';
import web3ContextReducer, {
  ACTIONS,
  initialState,
} from './web3ContextReducer';
import { Web3StateContext, Web3ActionsContext } from './web3Context';
import connectorCache from './connectorCache';

import network from '../chains/polygon';

const Web3ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(web3ContextReducer, initialState);

  const subscribeToProviderEvents = useCallback((provider, web3) => {
    if (!provider.on) {
      return;
    }
    provider.on('accountsChanged', async (accounts) => {
      const selectedAddress = accounts[0];
      if (selectedAddress) {
        dispatch({
          type: ACTIONS.ACCOUNT_CHANGED,
          payload: {
            currentAddress: accounts[0],
            signer: await web3.getSigner(),
          },
        });
      } else {
        dispatch({ type: ACTIONS.DISCONNECTED });
        connectorCache.clearCachedConnector();
      }
    });

    provider.on('chainChanged', (chainId) => {
      dispatch({ type: ACTIONS.CHAIN_CHANGED, payload: { chainId } });
    });

    provider.on('disconnect', () => {
      dispatch({ type: ACTIONS.DISCONNECTED });
      connectorCache.clearCachedConnector();
    });
  }, []);

  const disconnect = useCallback(async () => {
    if (state.web3?.currentProvider?.close) {
      await state.web3.currentProvider.close();
    }
    connectorCache.clearCachedConnector();
    dispatch({
      type: ACTIONS.DISCONNECTED,
    });
  }, [state.web3]);

  const connect = useCallback(
    async (connector) => {
      dispatch({
        type: ACTIONS.WEB3_PROVIDER_INSTALLED,
        payload: null,
      });
      try {
        const provider = await connector.connect();
        connectorCache.cacheConnector(connector);

        const web3 = new providers.Web3Provider(provider);
        const signer = await web3.getSigner();
        const currentAddress = await signer.getAddress();
        const chainId = await signer.getChainId();

        subscribeToProviderEvents(provider, web3);

        dispatch({
          type: ACTIONS.WEB3_PROVIDER_INSTALLED,
          payload: true,
        });

        dispatch({
          type: ACTIONS.CONNECTED,
          payload: {
            web3,
            chainId,
            currentAddress,
            signer,
          },
        });
      } catch (err) {
        connectorCache.clearCachedConnector();
        if (err.message === 'No MetaMask found') {
          dispatch({
            type: ACTIONS.WEB3_PROVIDER_INSTALLED,
            payload: false,
          });
        } else {
          dispatch({
            type: ACTIONS.DISCONNECTED,
          });
        }
      }
    },
    [subscribeToProviderEvents],
  );

  const changeNetwork = useCallback(async () => {
    if (!window.ethereum) {
      dispatch({
        type: ACTIONS.WEB3_PROVIDER_INSTALLED,
        payload: false,
      });
    } else {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{ ...network }],
      });
    }
  }, []);

  useEffect(() => {
    const cachedConnector = connectorCache.getCachedConnector();
    if (cachedConnector) {
      connectorCache.clearCachedConnector();
      connect(cachedConnector);
    }
  }, [connect]);

  const actions = useMemo(
    () => ({
      connect,
      disconnect,
      changeNetwork,
    }),
    [connect, disconnect, changeNetwork],
  );

  return (
    <Web3StateContext.Provider value={state}>
      <Web3ActionsContext.Provider value={actions}>
        {children}
      </Web3ActionsContext.Provider>
    </Web3StateContext.Provider>
  );
};

export default Web3ContextProvider;

Web3ContextProvider.propTypes = {
  children: PropTypes.any,
};
