import { useCallback } from 'react';
import { useMutation } from 'react-query';

import useAuctionContracts from '@contract/hooks/useAuctionContracts';
import useMarketContracts from '@contract/hooks/useMarketContracts';

import { useWeb3State } from '@features/web3/context';

import utils from '@shared/utils/utils';

const useListItemAction = (onSuccess, onError) => {
  const { currentAddress } = useWeb3State();
  const auctionContracts = useAuctionContracts();
  const marketContracts = useMarketContracts();

  const { mutateAsync: listAuctionItem, isLoading: isListingAuctionItem } =
    useMutation(
      async ({
        tokenId,
        auctionContract,
        duration,
        price,
        curator,
        curatorFeePercantage,
        currency,
      }) => {
        const amount = utils.toWei(price.toString());
        const tx = await auctionContracts.createAuction(
          tokenId,
          auctionContract,
          duration,
          amount,
          curator,
          curatorFeePercantage,
          currency,
          { from: currentAddress },
        );
        return tx.wait();
      },
      {
        onError,
        onSuccess,
      },
    );

  const { mutateAsync: listBuyNowItem, isLoading: isListingBuyNowItem } =
    useMutation(
      async ({ tokenId, price, currency }) => {
        const amount = utils.toWei(price.toString());

        const tx = await marketContracts.setAsk(tokenId, {
          amount,
          currency,
        });
        return tx.wait();
      },
      {
        onError,
        onSuccess,
      },
    );

  const listItem = useCallback(
    ({
      type,
      tokenId,
      auctionContract,
      duration,
      price,
      curator,
      curatorFeePercantage,
      currency,
    }) => {
      if (type === 'buyNow') {
        return listBuyNowItem({
          tokenId,
          price,
          currency,
        });
      }

      return listAuctionItem({
        tokenId,
        auctionContract,
        duration,
        price,
        curator,
        curatorFeePercantage,
        currency,
      });
    },
    [listAuctionItem, listBuyNowItem],
  );

  return {
    listItem,
    isListing: isListingAuctionItem || isListingBuyNowItem,
  };
};

export default useListItemAction;
