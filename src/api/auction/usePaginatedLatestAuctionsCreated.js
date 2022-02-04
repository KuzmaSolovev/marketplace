import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import auctionApi from '@api/auction/auction';
import { PAGED_LAST_CREATED_AUCTIONS } from '@api/constants/queryKeys';

import useAuctionCreatedPageCount from './useAuctionCreatedPageCount';

const DEFAULT_PAGE_SIZE = 10;

const usePaginatedLatestAuctionsCreated = ({ sortBy, enabled }) => {
  const [flatternResult, setFlatternResult] = useState();

  const { data: totalPages } = useAuctionCreatedPageCount({
    max: DEFAULT_PAGE_SIZE,
  });

  const paginatedQueryData = useInfiniteQuery(
    [PAGED_LAST_CREATED_AUCTIONS, DEFAULT_PAGE_SIZE, sortBy],
    async ({ pageParam = 1 }) => {
      const queryData = await auctionApi.getLatestAuctionsCreated({
        sortBy,
        max: DEFAULT_PAGE_SIZE,
        page: pageParam,
      });

      return {
        queryData,
        nextPage: pageParam + 1,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage <= totalPages) return lastPage.nextPage;
        return undefined;
      },
    },
    { enabled: enabled && totalPages },
  );

  useEffect(() => {
    if (paginatedQueryData?.data) {
      setFlatternResult(
        paginatedQueryData.data.pages?.map((d) => d.queryData).flat(),
      );
    }
  }, [paginatedQueryData.data]);

  return useMemo(() => {
    return {
      ...paginatedQueryData,
      data: flatternResult,
    };
  }, [paginatedQueryData, flatternResult]);
};

export default usePaginatedLatestAuctionsCreated;
