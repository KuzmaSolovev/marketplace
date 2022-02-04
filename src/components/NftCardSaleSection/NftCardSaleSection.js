import PropTypes from 'prop-types';
import Link from 'next/link';

import Image from '@components/Image';

import nftBid from '@assets//icons/nft-bid.svg';
import Counter from '@features/counter';

import styles from './NftCardSaleSection.module.scss';

const NftCardSaleSection = ({
  contractAddress,
  auctionId,
  endDateTime,
  latestBid,
  reservePrice,
}) => {
  return (
    <>
      <div className={styles.cardAuction}>
        <Counter endDateTime={endDateTime} short />
      </div>
      <div className={styles.cardBid}>
        <span className={styles.nftPrice}>
          {latestBid ? (
            <>
              <Image defaultSrc={nftBid.src} altText="Favorite svg" />{' '}
              {latestBid} MATIC{' '}
            </>
          ) : (
            <>{reservePrice} MATIC</>
          )}
        </span>
        <Link
          href={`/auction/${contractAddress}/${auctionId}`}
          shallow
          passHref>
          <a>
            <span className={styles.bidBtn}>Place Bid</span>
          </a>
        </Link>
      </div>
    </>
  );
};

NftCardSaleSection.propTypes = {
  name: PropTypes.string,
  auctionId: PropTypes.number,
  contractAddress: PropTypes.string,
  reservePrice: PropTypes.string,
  endDateTime: PropTypes.string,
  tokenId: PropTypes.number,
  latestBid: PropTypes.string,
};

export default NftCardSaleSection;
