import PropTypes from 'prop-types';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import Image from '@components/Image';

import useFetchUserProfile from '@api/user/useFetchUserProfile';
import useLatestAuctionBids from '@api/auction/useLatestAuctionBids';

import constructImageQuery from '@shared/utils/constructImageQuery';
import utils from '@shared/utils/utils';

import avatar from '@assets/images/avatar-small-placeholder.png';

import styles from './NftSimpleAuctionCards.module.scss';

const NftSimpleAuctionCards = ({ item }) => {
  const [price, setPrice] = useState({
    currentBid: '',
    reservePrice: utils.fromWei(item.reservePrice.toString()),
  });

  const {
    auctionId,
    tokenOwner,
    contractAddress,
    tokenMetadata: {
      metadata: { name, imageUri },
    },
  } = item;

  const { data: user } = useFetchUserProfile(tokenOwner);
  const { data: bids } = useLatestAuctionBids({ auctionId: item.auctionId });

  const profileImageUrl = user?.profileImage
    ? constructImageQuery(user?.profileImage)
    : avatar.src;

  useEffect(() => {
    if (bids && bids.length) {
      setPrice((prevState) => ({
        ...prevState,
        currentBid: utils.fromWei(bids[0].value.toString()),
      }));
    }
  }, [bids, user]);

  return (
    <Link href={`/auction/${contractAddress}/${auctionId}`} shallow passHref>
      <a>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <Image
              defaultSrc={constructImageQuery(imageUri)}
              width="158"
              height="158"
              altText="Card image"
            />
          </div>
          <div className={styles.avatarWrapper}>
            <Image
              defaultSrc={profileImageUrl}
              width="40"
              height="40"
              altText="Avatar image"
            />
          </div>
          <div>
            <h3 className={styles.cardName} aria-label="item-detail">
              {name}
            </h3>
            {price.currentBid ? (
              <div className={styles.currentBid}>{price.currentBid}</div>
            ) : (
              <div className={styles.reservePrice}>{price.reservePrice}</div>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

NftSimpleAuctionCards.propTypes = {
  item: PropTypes.shape({
    tokenMetadata: PropTypes.shape({
      metadata: PropTypes.shape({
        name: PropTypes.string,
        imageUri: PropTypes.string,
      }),
    }),
    auctionId: PropTypes.number,
    tokenOwner: PropTypes.string,
    contractAddress: PropTypes.string,
    reservePrice: PropTypes.number,
  }),
};

export default NftSimpleAuctionCards;
