import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';

import Image from '@components/Image';
import Arrow from '@components/Arrow';
import ConditionalWrapper from '@components/ConditionalWrapper';
import ActionMenuDropdown from '@components/ActionMenuDropdown';

import vector from '@assets/icons/vector.svg';

import styles from './NftAuctionCard.module.scss';

const NftAuctionCard = ({
  nftName,
  auctionStatus,
  imageUri,
  handleLeft,
  handleRight,
  page,
  hasNextPage,
}) => {
  return (
    <div className={styles.container}>
      <Image
        defaultSrc={vector.src}
        width="20"
        height="20"
        altText="Vector image"
        className={clsx(styles.vector, 'tablet-hide')}
      />
      <ActionMenuDropdown
        nftName={nftName}
        auctionStatus={auctionStatus}
        img={imageUri}
        className={clsx(styles.menu, 'tablet-hide')}
      />
      {handleLeft && page > 1 ? (
        <Arrow
          className={styles.leftArrow}
          size="Small"
          direction="Left"
          onClick={handleLeft}
        />
      ) : null}
      <ConditionalWrapper
        condition={auctionStatus?.auctionId}
        wrapper={(children) => (
          <Link
            href={`/auction/${auctionStatus.contractAddress}/${auctionStatus.auctionId}`}
            shallow
            passHref>
            <a>{children}</a>
          </Link>
        )}>
        <Image
          defaultSrc={imageUri}
          altText="Auction image"
          width="320"
          height="485"
          className={styles.auctionImage}
        />
      </ConditionalWrapper>

      {handleRight && hasNextPage ? (
        <Arrow
          className={styles.rightArrow}
          size="Small"
          direction="Right"
          onClick={handleRight}
        />
      ) : null}
    </div>
  );
};

NftAuctionCard.propTypes = {
  auctionStatus: PropTypes.shape({
    auctionId: PropTypes.any,
    reservePrice: PropTypes.number,
    auctionCurrency: PropTypes.string,
    endDateTime: PropTypes.string,
    contractAddress: PropTypes.string,
  }),
  nftName: PropTypes.string,
  imageUri: PropTypes.string,
  page: PropTypes.number,
  hasNextPage: PropTypes.bool,
  handleLeft: PropTypes.func,
  handleRight: PropTypes.func,
};

export default NftAuctionCard;
