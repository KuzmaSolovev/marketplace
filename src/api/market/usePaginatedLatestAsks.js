import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import marketApi from '@api/market/market';
import { PAGED_LATEST_ASKS } from '@api/constants/queryKeys';

import useLatestAsksPageCount from './useLatestAsksPageCount';

const DEFAULT_PAGE_SIZE = 10;

const usePaginatedLatestAsks = ({ sortBy, enabled }) => {
  const [flatternResult, setFlatternResult] = useState();

  const { data: totalPages } = useLatestAsksPageCount({
    max: DEFAULT_PAGE_SIZE,
  });

  const paginatedQueryData = useInfiniteQuery(
    [PAGED_LATEST_ASKS, DEFAULT_PAGE_SIZE, sortBy],
    async ({ pageParam = 1 }) => {
      const queryData = await marketApi.getLatestAsks({
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

export default usePaginatedLatestAsks;
