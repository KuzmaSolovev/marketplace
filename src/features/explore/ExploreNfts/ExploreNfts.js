import clsx from 'clsx';
import queryString from 'query-string';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import NftFilter from '@components/NftFilter';

import usePaginatedLatestAuctionsCreated from '@api/auction/usePaginatedLatestAuctionsCreated';
import usePaginatedLatestAsks from '@api/market/usePaginatedLatestAsks';

import * as filters from '@shared/constants/filters';
import { saleType, sortBy } from '@shared/enums/explore';
import capizalizeString from '@shared/utils/capizalizeWord';

import styles from './ExploreNfts.module.scss';

import NftExploreCardGrid from '../NftExploreCardGrid';

const initialData = {
  category: 1,
  saleType: null,
  sortBy: null,
};

const getInitialValuesFromQueryString = (query) => {
  return {
    ...initialData,
    saleType:
      Object.values(saleType).find((type) => type.name === query?.saleType)
        ?.id || 1,
    sortBy:
      Object.values(sortBy).find((type) => type.name === query?.sortBy)?.id ||
      1,
  };
};

const ExploreNfts = () => {
  const { query, push, pathname } = useRouter();

  const [nfts, setNfts] = useState();
  const [saleTypeFilter, setSaleTypeFilter] = useState();
  const [sorter, setSorter] = useState(() =>
    capizalizeString(filters.NEWEST_ITEMS),
  );

  const { reset, control, setValue, getValues } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(
      {
        ...getInitialValuesFromQueryString(query),
      },
      { keepDirty: true },
    );

    setSorter(capizalizeString(query.sortBy || filters.NEWEST_ITEMS));
    setSaleTypeFilter(query.saleType || filters.AUCTION);
    setNfts();
  }, [reset, query]);

  const {
    data: auctionData,
    hasNextPage: auctionHasNextPage,
    fetchNextPage: auctionFetchNextPage,
  } = usePaginatedLatestAuctionsCreated({
    sortBy: sorter,
    enabled: !!sorter && saleTypeFilter === 'auction',
  });

  const {
    data: buyNowData,
    hasNextPage: asksHasNextPage,
    fetchNextPage: asksFetchNextPage,
  } = usePaginatedLatestAsks({
    sortBy: sorter,
    enabled: !!sorter && saleTypeFilter === 'buyNow',
  });

  useEffect(() => {
    if (saleTypeFilter === filters.AUCTION && auctionData) {
      setNfts([...auctionData]);
    } else if (saleTypeFilter === filters.BUY_NOW && buyNowData) {
      setNfts([...buyNowData]);
    }
  }, [buyNowData, auctionData, saleTypeFilter]);

  const handleSaleTypeChange = (item) => {
    let sortBy = '';
    sortBy = 'newestItems';
    setValue('sortBy', 1);
    setNfts();

    push({
      pathname,
      query: queryString.stringify(
        {
          saleType: item.name,
          sortBy,
        },
        {
          skipNull: true,
          skipEmptyString: true,
          sort: false,
        },
      ),
    });
  };

  const handleSortByChange = (item) => {
    const constructQuery = !!Object.keys(query).length
      ? { ...query }
      : { saleType: 'auction' };
    push({
      pathname,
      query: queryString.stringify(
        {
          ...constructQuery,
          sortBy: item.name,
        },
        {
          skipNull: true,
          skipEmptyString: true,
          sort: false,
        },
      ),
    });
  };

  return (
    <section className={clsx('section section-top', styles.exploreSection)}>
      <NftFilter
        control={control}
        handleSaleTypeChange={handleSaleTypeChange}
        handleSortByChange={handleSortByChange}
        saleTypeFilter={saleTypeFilter}
      />
      <NftExploreCardGrid
        nfts={nfts}
        saleType={capizalizeString(saleTypeFilter || '')}
        hasNextPage={
          getValues().saleType === 1 ? auctionHasNextPage : asksHasNextPage
        }
        fetchNextPage={
          getValues().saleType === 1 ? auctionFetchNextPage : asksFetchNextPage
        }
      />
    </section>
  );
};

export default ExploreNfts;
