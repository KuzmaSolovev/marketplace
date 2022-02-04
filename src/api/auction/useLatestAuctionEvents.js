import { useQuery } from 'react-query';
import auctionApi from '@api/auction/auction';
import { LATEST_AUCTION_EVENT } from '@api/constants/queryKeys';

const useLatestAuctionEvents = (params) => {
  return useQuery([LATEST_AUCTION_EVENT, params], () =>
    auctionApi.getLatestAuctionEventsByAuctionId(params),
  );
};

export default useLatestAuctionEvents;
