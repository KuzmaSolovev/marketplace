import { useCallback, useState, useEffect } from 'react';
import { useMutation } from 'react-query';

import useAuctionContracts from '@contract/hooks/useAuctionContracts';

import { useWeb3State } from '@features/web3/context';

import utils from '@shared/utils/utils';

const useAutionBidAction = (auctionEndTime, onSuccess, onError) => {
  const { currentAddress } = useWeb3State();
  const auctionContract = useAuctionContracts();
  const [isAuctionStillActive, setIsAuctionstillActive] = useState(true);

  useEffect(() => {
    if (!auctionEndTime || new Date() <= new Date(auctionEndTime)) {
      setIsAuctionstillActive(true);
    } else {
      setIsAuctionstillActive(false);
    }
  }, [auctionEndTime]);

  const { mutateAsync: createAuctionBid, isLoading: isBidding } = useMutation(
    async ({ auctionId, value }) => {
      const amount = utils.toWei(value.toString());
      const tx = await auctionContract.createBid(auctionId, amount, {
        from: currentAddress,
        value: amount,
      });
      return tx.wait();
    },
    {
      onError,
      onSuccess,
    },
  );

  const { mutateAsync: endAuction, isLoading: isEnding } = useMutation(
    async ({ auctionId }) => {
      const tx = await auctionContract.endAuction(auctionId);
      return tx.wait();
    },
    {
      onError,
      onSuccess,
    },
  );

  const sendTransaction = useCallback(
    ({ auctionId, value }) => {
      if (value) {
        return createAuctionBid({
          auctionId,
          value,
        });
      }

      return endAuction({ auctionId });
    },
    [createAuctionBid, endAuction],
  );

  return {
    sendTransaction,
    isAuctionStillActive,
    isLoading: isBidding || isEnding,
  };
};

export default useAutionBidAction;
