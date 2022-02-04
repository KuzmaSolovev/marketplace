import { useQuery } from 'react-query';
import marketApi from '@api/market/market';
import { ASKS_PAGE_COUNT } from '@api/constants/queryKeys';

const useLatestAsksPageCount = (query) => {
  return useQuery([ASKS_PAGE_COUNT, query], () =>
    marketApi.getLatestAsksPageCount(query),
  );
};

export default useLatestAsksPageCount;
