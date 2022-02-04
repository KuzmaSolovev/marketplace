import { useQuery } from 'react-query';
import auctionApi from '@api/auction/auction';
import { AUCTION_PAGE_COUNT } from '@api/constants/queryKeys';

const useAuctionCreatedPageCount = (query) => {
  return useQuery([AUCTION_PAGE_COUNT, query], () =>
    auctionApi.getAuctionCreatedPageCount(query),
  );
};

export default useAuctionCreatedPageCount;
