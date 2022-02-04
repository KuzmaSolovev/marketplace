import config from '@config';

export const ACTIONS = {
  CONNECTED: 'CONNECTED',
  CHAIN_CHANGED: 'CHAIN_CHANGED',
  ACCOUNT_CHANGED: 'ACCOUNT_CHANGED',
  DISCONNECTED: 'DISCONNECTED',
  WEB3_PROVIDER_INSTALLED: 'WEB3_PROVIDER_INSTALLED',
};

export const initialState = {
  web3: null,
  currentAddress: null,
  chainId: null,
  signer: null,
  isCorrectChain: false,
  providerInstalled: null,
};

const web3ContextReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CONNECTED:
      return {
        ...state,
        web3: action.payload.web3,
        signer: action.payload.signer,
        currentAddress: action.payload.currentAddress,
        chainId: action.payload.chainId,
        isCorrectChain: +action.payload.chainId === +config.chainId,
      };
    case ACTIONS.CHAIN_CHANGED:
      return {
        ...state,
        chainId: action.payload.chainId,
        isCorrectChain: +action.payload.chainId === +config.chainId,
      };
    case ACTIONS.ACCOUNT_CHANGED: {
      return {
        ...state,
        currentAddress: action.payload.currentAddress,
        signer: action.payload.signer,
      };
    }
    case ACTIONS.DISCONNECTED:
      return { ...initialState, isConnectionLoading: false };
    case ACTIONS.WEB3_PROVIDER_INSTALLED:
      return { ...initialState, providerInstalled: action.payload };
    default:
      return state;
  }
};

export default web3ContextReducer;
