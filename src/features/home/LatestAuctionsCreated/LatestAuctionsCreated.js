import clsx from 'clsx';

import { useEffect, useState } from 'react';

import NftAuctionCard from '@components/NftAuctionCard';
import Arrow from '@components/Arrow';
import Loader from '@components/Loader';

import useLastCreatedAuctions from '@api/auction/useLastCreatedAuctions';
import useAuctionCreatedPageCount from '@api/auction/useAuctionCreatedPageCount';
import constructImageQuery from '@shared/utils/constructImageQuery';

import NftDetails from '@components/NftDetails';
import PlaceBid from '@features/auction/PlaceBid';

import styles from './LatestAuctionsCreated.module.scss';

const LatestAuctionsCrated = () => {
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [tokenMetadata, setTokenMetadata] = useState();
  const [auctionStatus, setAuctionStatus] = useState();
  const [imageUri, setImageUri] = useState('');

  const { data: numberOfItems } = useAuctionCreatedPageCount({
    max: 1,
  });

  const select = (data) => data[0];

  const { data, isSuccess } = useLastCreatedAuctions(
    {
      sortBy: 'HighestBids',
      max: 1,
      page,
      enabled: !!numberOfItems,
    },
    select,
  );

  const resetData = () => {
    setTokenMetadata();
    setAuctionStatus();
  };

  const handleLeft = () => {
    if (page === 0) {
      return;
    }
    setPage((prevState) => prevState - 1);
    resetData();
  };

  const handleRight = () => {
    if (page === numberOfItems) {
      return;
    }
    setPage((prevState) => prevState + 1);
    resetData();
  };

  useEffect(() => {
    if (numberOfItems && numberOfItems === page) {
      setHasNextPage(false);
    } else if (numberOfItems && numberOfItems > page) {
      setHasNextPage(true);
    }
  }, [numberOfItems, page]);

  useEffect(() => {
    if (data) {
      setTokenMetadata({
        ...data.tokenMetadata,
        tokenOwner: data.tokenOwner,
      });
      setAuctionStatus({
        auctionId: data.auctionId,
        reservePrice: data.reservePrice,
        auctionCurrency: data.auctionCurrency,
        endDateTime: data.endDateTime,
        curator: data.curator,
        curatorFeePercentage: data.curatorFeePercentage,
        contractAddress: data.contractAddress,
      });
      setImageUri(constructImageQuery(data.tokenMetadata.metadata.imageUri));
    }
  }, [data]);

  return (
    <section className={clsx('section section-top', styles.container)}>
      {!isSuccess || !tokenMetadata ? (
        <Loader />
      ) : (
        <>
          {page > 1 ? (
            <Arrow
              className={styles.leftArrow}
              size="Large"
              direction="Left"
              onClick={handleLeft}
            />
          ) : (
            <div className={styles.placeholder} />
          )}
          <NftAuctionCard
            nftName={tokenMetadata.metadata.name}
            auctionStatus={auctionStatus}
            imageUri={imageUri}
            handleLeft={handleLeft}
            handleRight={handleRight}
            page={page}
            hasNextPage={hasNextPage}
          />
          <div className={styles.nftContainer}>
            <NftDetails
              img={imageUri}
              tokenMetadata={tokenMetadata}
              auctionStatus={auctionStatus}
            />
            <PlaceBid auctionStatus={auctionStatus} />
          </div>

          {hasNextPage ? (
            <Arrow
              className={styles.rightArrow}
              size="Large"
              direction="Right"
              onClick={handleRight}
            />
          ) : (
            <div className={styles.placeholder} />
          )}
        </>
      )}
    </section>
  );
};

export default LatestAuctionsCrated;
