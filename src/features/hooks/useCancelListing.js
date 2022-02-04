import { useCallback } from 'react';
import { useMutation } from 'react-query';

import useAuctionContracts from '@contract/hooks/useAuctionContracts';
import useMediaContracts from '@contract/hooks/useMediaContracts';

const useCancelListing = (onSuccess, onError) => {
  const auctionContract = useAuctionContracts();
  const mediaContract = useMediaContracts();

  const { mutateAsync: cancelAuction, isLoading: isCancelingAuction } =
    useMutation(
      async ({ auctionId }) => {
        const tx = await auctionContract.cancelAuction(auctionId);
        return tx.wait();
      },
      {
        onError,
        onSuccess,
      },
    );

  const { mutateAsync: cancelBuyNow, isLoading: isCancelingAsk } = useMutation(
    async ({ tokenId }) => {
      const tx = await mediaContract.removeAsk(tokenId);
      return tx.wait();
    },
    {
      onError,
      onSuccess,
    },
  );

  const removeListing = useCallback(
    ({ auctionId, tokenId }) => {
      if (auctionId) {
        return cancelAuction({ auctionId });
      }
      return cancelBuyNow({ tokenId });
    },
    [cancelAuction, cancelBuyNow],
  );

  return {
    removeListing,
    isLoading: isCancelingAuction || isCancelingAsk,
  };
};

export default useCancelListing;
