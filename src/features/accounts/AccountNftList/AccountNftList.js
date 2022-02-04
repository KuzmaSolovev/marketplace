import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import useLastCreatedAuctions from '@api/auction/useLastCreatedAuctions';
import Tabs from '@components/Tabs';
import NftCardGrid from '@components/NftCardGrid';
import AccountConnectMessage from '@components/AccountConnectMessage';

import marketApi from '@api/market/market';
import mediaApi from '@api/media/media';
import config from '@config';

import { LATEST_ASKS, OWNED_NFTS } from '@api/constants/queryKeys';
import styles from './AccountNftList.module.scss';
import useOwnedTokens from '../hooks/useOwnedTokens';

import { TabNames } from '../constants';

const tabs = [
  {
    id: TabNames.AUCTION,
    label: 'Auction',
  },
  {
    id: TabNames.ON_SALE,
    label: 'On Sale',
  },
  {
    id: TabNames.OWNED,
    label: 'Owned',
  },
];

const AccountNftList = ({ isConnected, walletAddress, initialTab }) => {
  const router = useRouter();
  const [tab, setTab] = useState(null);
  const [nfts, setFilteredNfts] = useState(null);

  const { data: ownedTokenIds } = useOwnedTokens({
    address: walletAddress,
    enabled: !!tab && tab !== 'auction',
  });

  const { data: auctions, isSuccess: auctionsFetchSuccess } =
    useLastCreatedAuctions({
      walletAddress,
      max: 100,
      page: 1,
      cancelled: false,
      ended: false,
      enabled: tab === 'auction',
    });

  const { data: latestAsks, isSuccess: askFetchSuccess } = useQuery(
    [LATEST_ASKS, walletAddress],
    async () => {
      const latestAsks = await marketApi.getLatestAsks({
        max: 100,
        page: 1,
        walletAddress,
      });

      const tokenIdsOnSale = ownedTokenIds.filter((ownedTokenId) =>
        latestAsks.some((ask) => ownedTokenId === ask.tokenId),
      );
      const nftsPromise = tokenIdsOnSale.map((id) =>
        mediaApi.getMetadata({
          tokenId: id,
          contractAddress: config.contracts.mediaAddress,
        }),
      );

      return Promise.all(nftsPromise);
    },
    {
      enabled: tab === 'on_sale' && !!ownedTokenIds,
    },
  );

  const { data: owned, isSuccess: ownedFetchSuccess } = useQuery(
    [OWNED_NFTS, walletAddress],
    async () => {
      const latestAsks = await marketApi.getLatestAsks({
        max: 100,
        page: 1,
        walletAddress,
      });

      const tokenIdsdNotOnSale = ownedTokenIds.filter(
        (ownedTokenId) =>
          !latestAsks.some((ask) => ownedTokenId === ask.tokenId),
      );
      const nftsPromise = tokenIdsdNotOnSale.map((id) =>
        mediaApi.getMetadata({
          tokenId: id,
          contractAddress: config.contracts.mediaAddress,
        }),
      );

      return Promise.all(nftsPromise);
    },
    {
      enabled: tab === 'owned' && !!ownedTokenIds,
    },
  );

  useEffect(() => {
    setTab(router.query?.tab || initialTab);
    setFilteredNfts(null);
  }, [router.query.tab, initialTab]);

  useEffect(() => {
    if (tab === 'auction' && auctionsFetchSuccess) {
      setFilteredNfts([...auctions]);
    } else if (tab === 'on_sale' && askFetchSuccess) {
      setFilteredNfts([
        ...latestAsks.reduce((result, item) => {
          result.push({ tokenMetadata: item });
          return result;
        }, []),
      ]);
    } else if (tab === 'owned' && ownedFetchSuccess) {
      setFilteredNfts([
        ...owned.reduce((result, item) => {
          result.push({ tokenMetadata: item });
          return result;
        }, []),
      ]);
    }
  }, [
    askFetchSuccess,
    auctions,
    auctionsFetchSuccess,
    latestAsks,
    owned,
    ownedFetchSuccess,
    tab,
  ]);

  return (
    <section className={clsx('section section-top', styles.nftListFlex)}>
      {isConnected ? (
        <>
          <Tabs tabs={tabs} currentTab={tab} />
          <NftCardGrid nfts={nfts} tab={tab} />
        </>
      ) : (
        <AccountConnectMessage />
      )}
    </section>
  );
};

AccountNftList.propTypes = {
  walletAddress: PropTypes.string,
  initialTab: PropTypes.string,
  isConnected: PropTypes.string,
};

export default AccountNftList;
