import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import useLatestAuctionEvents from '@api/auction/useLatestAuctionEvents';

import PlaceBid from '@features/auction/PlaceBid';
import NftAuctionCard from '@components/NftAuctionCard';
import Loader from '@components/Loader';
import NftDetails from '@components/NftDetails';
import NftDescription from '@components/NftDescription';
import AuctionBiddingHistory from '@components/AuctionBiddingHistory';
import useLatestAuctionBids from '@api/auction/useLatestAuctionBids';
import useMetadata from '@api/media/useMetadata';

import constructImageQuery from '@shared/utils/constructImageQuery';

const AuctionDetails = ({ contractAddress, auctionId }) => {
  const [tokenMetadata, setTokenMetadata] = useState();
  const [auctionStatus, setAuctionStatus] = useState();
  const [imageUri, setImageUri] = useState('');
  const { data, isSuccess } = useLatestAuctionEvents({
    auctionId,
    contractAddress,
    max: 1,
    page: 1,
  });
  const { data: bids } = useLatestAuctionBids(
    { auctionId, max: 5, page: 1, contractAddress },
    !!auctionId,
  );

  const { data: token } = useMetadata({
    tokenId: data?.createdEvent.tokenId,
    contractAddress: data?.createdEvent.tokenContract,
    enabled: !!data?.createdEvent.tokenId,
  });

  useEffect(() => {
    if (!!data && !!token) {
      setTokenMetadata({
        ...token,
        tokenOwner: data?.createdEvent.tokenOwner,
      });
      setAuctionStatus({
        auctionId: data.auctionId,
        reservePrice: data?.createdEvent?.reservePrice,
        auctionCurrency: data?.createdEvent?.auctionCurrency,
        endDateTime: data?.createdEvent?.endDateTime,
        lastBids: bids,
      });
      setImageUri(constructImageQuery(token.metadata?.imageUri));
    }
  }, [bids, data, token]);

  return (
    <section className={'section section-top nft-container'}>
      {!isSuccess || !tokenMetadata || !auctionStatus ? (
        <Loader />
      ) : (
        <>
          <NftAuctionCard imageUri={imageUri} />
          <div className="nft-container-details">
            <NftDetails
              auctionStatus={auctionStatus}
              tokenMetadata={tokenMetadata}
              img={imageUri}
            />
            <NftDescription description={tokenMetadata.metadata.description} />
            {auctionStatus.lastBids && auctionStatus.lastBids.length !== 0 ? (
              <AuctionBiddingHistory bids={auctionStatus.lastBids} />
            ) : null}
            <PlaceBid auctionStatus={auctionStatus} />
          </div>
        </>
      )}
    </section>
  );
};

AuctionDetails.propTypes = {
  auctionId: PropTypes.string,
  contractAddress: PropTypes.string,
};

export default AuctionDetails;
