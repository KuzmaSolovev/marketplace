import PropTypes from 'prop-types';

import Image from '@components/Image';
import ActionButton from '@components/Button';

import favorite from '@assets/icons/favorite.svg';
import nftBid from '@assets//icons/nft-bid.svg';

import styles from './NftCardOwnedSection.module.scss';

const NftCardAction = ({ name, likes, price }) => {
  return (
    <>
      <div className={styles.cardDescription}>
        <span className={styles.nftName}>{name}</span>
      </div>
      <div className={styles.cardBid}>
        <span className={styles.nftPrice}>
          <Image defaultSrc={nftBid.src} altText="token svg" /> {price}
        </span>
        <span className={styles.likeCount}>
          {likes} <Image defaultSrc={favorite.src} altText="Favorite svg" />
        </span>
      </div>
      <div className={styles.btnSale}>
        <ActionButton className={styles.btnStyle} label="Sale item" />
      </div>
    </>
  );
};

NftCardAction.propTypes = {
  name: PropTypes.string,
  likes: PropTypes.number,
  price: PropTypes.number,
};

export default NftCardAction;
