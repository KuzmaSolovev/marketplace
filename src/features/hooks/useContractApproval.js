import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { useWeb3State } from '@features/web3/context';
import useKitsumonNFTContract from '@contract/hooks/useKitsumonNFTContract';

const useContractApproval = () => {
  const { currentAddress } = useWeb3State();
  const nftContract = useKitsumonNFTContract();

  const { mutateAsync: approveContractOwner, isLoading: isApproving } =
    useMutation(
      async ({ auctionContract, tokenId }) => {
        const contractAddress = await nftContract.getApproved(tokenId);
        if (contractAddress === auctionContract) {
          return true;
        }
        const tx = await nftContract.approve(auctionContract, tokenId, {
          from: currentAddress,
        });
        return tx.wait();
      },
      {
        onError: () => {
          toast.error('Approving contract failed!');
        },
        onSuccess: (hash) => {
          if (typeof hash === 'string' && hash) {
            toast.success('Your contract has been approved!');
          }
        },
      },
    );

  const approveContract = useCallback(
    ({ auctionContract, tokenId }) => {
      return approveContractOwner({
        auctionContract,
        tokenId,
      });
    },
    [approveContractOwner],
  );

  return {
    approveContract,
    isApproving,
  };
};

export default useContractApproval;
