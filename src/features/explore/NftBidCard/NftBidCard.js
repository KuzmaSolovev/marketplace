import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

import NftCardSaleSection from '@components/NftCardSaleSection';
import NftCardWrapper from '@components/NftCardWrapper';

import useLatestAuctionBids from '@api/auction/useLatestAuctionBids';
import useFetchUserProfile from '@api/user/useFetchUserProfile';

import constructImageQuery from '@shared/utils/constructImageQuery';

import avatar from '@assets/images/avatar-small-placeholder.png';

import utils from '@shared/utils/utils';

const NftBidCard = ({ card, handler }) => {
  const {
    tokenMetadata: {
      metadata: { name, imageUri },
    },
    auctionId,
    tokenId,
    endDateTime,
    tokenOwner,
    contractAddress,
  } = card;

  const select = (data) => data[0];

  const [latestBid, setLatestBid] = useState();
  const [reservePrice, setReservePrice] = useState();
  const imageUrl = constructImageQuery(imageUri);
  const { data: bid } = useLatestAuctionBids(
    { auctionId: card.auctionId },
    !!card.auctionId,
    select,
  );
  const { data: user } = useFetchUserProfile(tokenOwner);

  const profileImageUrl = user?.profileImage
    ? constructImageQuery(user?.profileImage)
    : avatar.src;

  useEffect(() => {
    if (bid) {
      setLatestBid(utils.fromWei(bid.value.toString()));
    } else {
      setReservePrice(utils.fromWei(card.reservePrice.toString()));
    }
  }, [bid, card.reservePrice]);

  return (
    <NftCardWrapper
      nftDetails={{
        name,
        imageUri: imageUrl,
        nftGeneration: 'GEN-0',
        userAvatar: profileImageUrl,
        tokenId: tokenId,
        tokenAddress: contractAddress,
        tokenOwner,
      }}>
      <NftCardSaleSection
        name={name}
        auctionId={auctionId}
        contractAddress={contractAddress}
        endDateTime={endDateTime}
        tokenId={tokenId}
        latestBid={latestBid}
        reservePrice={reservePrice}
        handler={handler}
      />
    </NftCardWrapper>
  );
};

NftBidCard.propTypes = {
  card: PropTypes.shape({
    auctionId: PropTypes.number,
    tokenId: PropTypes.number,
    reservePrice: PropTypes.number,
    contractAddress: PropTypes.string,
    tokenMetadata: PropTypes.shape({
      metadata: PropTypes.shape({
        name: PropTypes.string,
        imageUri: PropTypes.string,
      }),
    }),
    tokenOwner: PropTypes.string,
    endDateTime: PropTypes.string,
  }),
  handler: PropTypes.func,
};

export default NftBidCard;
