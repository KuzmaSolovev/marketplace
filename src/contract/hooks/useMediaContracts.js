import { Contract } from 'ethers';
import { useWeb3State } from '@features/web3/context';
import { useMemo } from 'react';
import config from '@config';
import MediaInterface from '../abi/IMedia.json';

const useMediaContracts = () => {
  const { signer, isCorrectChain } = useWeb3State();

  return useMemo(() => {
    if (!signer || !isCorrectChain) return null;
    return new Contract(config.contracts.mediaAddress, MediaInterface, signer);
  }, [signer, isCorrectChain]);
};

export default useMediaContracts;
