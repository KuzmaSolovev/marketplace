import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import NftBidCard from '@features/explore/NftBidCard';
import NftBuyCard from '@features/explore/NftTradeCard';
import GridCardSkeleton from '@components/GridCardSkeleton';
import LoadMore from '@components/LoadMore';

const NftExploreCardGrid = ({ nfts, saleType, hasNextPage, fetchNextPage }) => {
  const { push } = useRouter();

  const actionType = saleType === 'Auction' ? 'Auction' : 'Buy';
  const CardItem = actionType === 'Auction' ? NftBidCard : NftBuyCard;

  const handleBuyNow = (tokenId) => {
    if (!tokenId) {
      return;
    }
    push(`/buy-item/${nfts[0].tokenAddress}/${tokenId}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="nft-gallery explore-grid">
      {!!nfts
        ? nfts.map((card) => (
            <CardItem
              key={card.tokenId}
              card={card}
              actionType={actionType}
              handler={handleBuyNow}
            />
          ))
        : [...Array(10)].map((_, index) => <GridCardSkeleton key={index} />)}
      <LoadMore hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </div>
  );
};

NftExploreCardGrid.propTypes = {
  nfts: PropTypes.array,
  saleType: PropTypes.string,
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};

NftExploreCardGrid.defaultProps = {
  exploreGrid: false,
  saleType: 'Auction',
};

export default NftExploreCardGrid;
