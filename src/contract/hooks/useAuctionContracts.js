import { Contract } from 'ethers';
import { useWeb3State } from '@features/web3/context';
import { useMemo } from 'react';
import config from '@config';
import AuctionInterface from '../abi/IAuctionHouse.json';

const useAuctionContracts = () => {
  const { signer, isCorrectChain } = useWeb3State();

  return useMemo(() => {
    if (!signer || !isCorrectChain) return null;
    return new Contract(
      config.contracts.auctionFactory,
      AuctionInterface,
      signer,
    );
  }, [signer, isCorrectChain]);
};

export default useAuctionContracts;
