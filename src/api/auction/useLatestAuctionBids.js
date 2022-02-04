import { useQuery } from 'react-query';
import auctionApi from '@api/auction/auction';
import { LATEST_AUCTION_BIDS } from '@api/constants/queryKeys';

const useLatestAuctionBids = (params, enabled, select) => {
  return useQuery(
    [LATEST_AUCTION_BIDS, params],
    () => auctionApi.getLatestAuctionBids(params),
    { enabled, select },
  );
};

export default useLatestAuctionBids;
