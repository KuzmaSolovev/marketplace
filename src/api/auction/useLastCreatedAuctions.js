import { useQuery } from 'react-query';
import auctionApi from '@api/auction/auction';
import { LAST_CREATED_AUCTIONS } from '@api/constants/queryKeys';

const useLastCreatedAuctions = (searchQuery, select) => {
  const { enabled, ...rest } = searchQuery;
  return useQuery(
    [LAST_CREATED_AUCTIONS, rest],
    () => auctionApi.getLatestAuctionsCreated(rest),
    { enabled, select },
  );
};

export default useLastCreatedAuctions;
