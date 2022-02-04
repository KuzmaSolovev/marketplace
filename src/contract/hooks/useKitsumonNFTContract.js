import { Contract } from 'ethers';
import { useWeb3State } from '@features/web3/context';
import { useMemo } from 'react';
import config from '@config';
import ERC721Interface from '../abi/IERC721.json';

const useKitsumonNFTContract = () => {
  const { signer, isCorrectChain } = useWeb3State();

  return useMemo(() => {
    if (!signer || !isCorrectChain) return null;
    return new Contract(
      config.contracts.nftContractAddress,
      ERC721Interface,
      signer,
    );
  }, [signer, isCorrectChain]);
};

export default useKitsumonNFTContract;
