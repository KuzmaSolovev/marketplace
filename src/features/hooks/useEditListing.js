import { useCallback } from 'react';
import { useMutation } from 'react-query';

import useAuctionContracts from '@contract/hooks/useAuctionContracts';
import useMediaContracts from '@contract/hooks/useMediaContracts';

import utils from '@shared/utils/utils';

const useEditListing = (onSuccess, onError) => {
  const auctionContract = useAuctionContracts();
  const mediaContract = useMediaContracts();

  const { mutateAsync: editAuction, isLoading: isEditingAuction } = useMutation(
    async ({ auctionId, value }) => {
      const price = utils.toWei(value.toString());
      const tx = await auctionContract.setAuctionReservePrice(auctionId, price);
      return tx.wait();
    },
    {
      onError,
      onSuccess,
    },
  );

  const { mutateAsync: editAsk, isLoading: isEditingAsk } = useMutation(
    async ({ tokenId, value }) => {
      const price = utils.toWei(value.toString());
      const tx = await mediaContract.setAsk(tokenId, price);
      return tx.wait();
    },
    {
      onError,
      onSuccess,
    },
  );

  const editListing = useCallback(
    ({ auctionId, tokenId, value }) => {
      if (auctionId) {
        return editAuction({ auctionId, value });
      }
      return editAsk({ tokenId, value });
    },
    [editAsk, editAuction],
  );

  return {
    editListing,
    isLoading: isEditingAuction || isEditingAsk,
  };
};

export default useEditListing;
