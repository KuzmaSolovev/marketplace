import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { BigNumber } from 'ethers';

import { useWeb3State } from '@features/web3/context';
import useMediaContracts from '@contract/hooks/useMediaContracts';

const useBuyNowAction = (onSuccess, onError) => {
  const { currentAddress } = useWeb3State();
  const mediaContract = useMediaContracts();

  const { mutateAsync: buyNft, isLoading: isBuying } = useMutation(
    async ({ tokenId, tokenOwner, amount, currency }) => {
      const tx = await mediaContract.setBid(tokenId, {
        amount: BigNumber.from(amount.toString()),
        currency,
        bidder: currentAddress,
        recipient: tokenOwner,
        sellOnShare: { value: '0' },
      });
      return tx.wait();
    },
    {
      onError,
      onSuccess,
    },
  );

  const sendTransaction = useCallback(
    ({ tokenId, tokenOwner, amount, currency }) => {
      return buyNft({
        tokenId,
        tokenOwner,
        amount,
        currency,
      });
    },
    [buyNft],
  );

  return {
    sendTransaction,
    isLoading: isBuying,
  };
};

export default useBuyNowAction;
