import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import NftBidCard from '@features/explore/NftBidCard';
import NftTradeCard from '@features/explore/NftTradeCard';
import GridCardSkeleton from '@components/GridCardSkeleton';
import NoItemsMessage from '@components/NoItemsMessage';

import styles from './NftCardGrid.module.scss';

const NftCardGrid = ({ nfts, tab }) => {
  const { push, asPath } = useRouter();
  const CardItem = tab === 'auction' ? NftBidCard : NftTradeCard;
  const buyNowHandler = (tokenId) => {
    if (!tokenId) {
      return;
    }
    push(
      `/buy-item/${nfts[0].tokenMetadata.contractAddress}/${tokenId}`,
      undefined,
      {
        shallow: true,
      },
    );
  };

  const sellHandler = (tokenId) => {
    if (!tokenId) {
      return;
    }
    push(
      `${asPath.substring(0, asPath.indexOf('?'))}/sell-item/${
        nfts[0].tokenMetadata.contractAddress
      }/${tokenId}`,
      undefined,
      {
        shallow: true,
      },
    );
  };

  const placeBidHandler = () => {};

  const callHandler = (id) => {
    if (tab === 'auction') {
      placeBidHandler(id);
    } else if (tab === 'owned') {
      sellHandler(id);
    } else {
      buyNowHandler(id);
    }
  };

  const getType = () => {
    if (tab === 'Auction') {
      return 'auction';
    } else if (tab === 'on_sale') {
      return 'Buy';
    } else {
      return 'Sell';
    }
  };

  if (!nfts) {
    return (
      <div className={styles.nftGallery}>
        {Array(10)
          .fill()
          .map((_, index) => (
            <GridCardSkeleton key={index} />
          ))}
      </div>
    );
  } else if (nfts.length === 0) {
    return <NoItemsMessage />;
  } else {
    return (
      <div className={styles.nftGallery}>
        {nfts.map((card) => (
          <CardItem
            key={card.tokenId || card.tokenMetadata.tokenId}
            actionType={getType()}
            card={card}
            handler={callHandler}
          />
        ))}
      </div>
    );
  }
};

NftCardGrid.propTypes = {
  nfts: PropTypes.array,
  tab: PropTypes.oneOf(['on_sale', 'owned', 'auction']),
};

export default NftCardGrid;
