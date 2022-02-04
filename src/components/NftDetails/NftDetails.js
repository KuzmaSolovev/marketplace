import PropTypes from 'prop-types';
import Link from 'next/link';

import Image from '@components/Image';
import ActionMenuDropdown from '@components/ActionMenuDropdown';

import useFetchUserProfile from '@api/user/useFetchUserProfile';

import TokenLike from '@features/tokenLike';
import constructImageQuery from '@shared/utils/constructImageQuery';

import share from '@assets/icons/vector.svg';
import eye from '@assets/icons/eye.svg';
import box from '@assets/icons/shipping-box.svg';
import avatar from '@assets/images/avatar-small-placeholder.png';

import styles from './NftDetails.module.scss';
import SocialMenuDropdown from '@components/SocialMenuDropdown';

const NftDetails = ({ tokenMetadata, auctionStatus, img }) => {
  const { data: user } = useFetchUserProfile(tokenMetadata?.tokenOwner);

  const profileImageUrl = user?.profileImage
    ? constructImageQuery(user?.profileImage)
    : avatar.src;

  return (
    <div className={styles.container}>
      <div className={styles.creator}>
        <Link
          href={`/accounts/${user?.username || tokenMetadata?.tokenOwner}`}
          shallow
          passHref>
          <a>
            <div className={styles.creatorDetails}>
              <Image
                className={styles.creatorAvatar}
                defaultSrc={profileImageUrl}
                width="32"
                height="32"
                altText="Avatar image"
              />
              <div>
                <span>{user?.username || tokenMetadata?.tokenOwner}</span>
              </div>
            </div>
          </a>
        </Link>
        <div className={styles.actions}>
          <TokenLike
            tokenId={tokenMetadata.tokenId}
            tokenAddress={tokenMetadata.contractAddress}
          />
          {/* <Image
            defaultSrc={share.src}
            width="16"
            height="16"
            altText="Avatar image"
            className="mobile-hide"
          /> */}
          <SocialMenuDropdown />
          <ActionMenuDropdown
            auctionStatus={auctionStatus}
            img={img}
            nftName={tokenMetadata.metadata.name}
            className="mobile-hide"
          />
        </div>
      </div>
      <div className={styles.tokenWatchlist}>
        <div className={styles.egg}>
          <Image
            defaultSrc={box.src}
            width="20"
            height="20"
            altText="Avatar image"
          />
          <span>Egg</span>
        </div>
        <div className={styles.views}>
          <Image
            defaultSrc={eye.src}
            width="20"
            height="20"
            altText="Avatar image"
          />
          <span>0</span>
        </div>
      </div>
      <div className={styles.tokenDetails}>
        {auctionStatus?.auctionId ? (
          <Link
            href={`/auction/${auctionStatus.contractAddress}/${auctionStatus.auctionId}`}
            shallow
            passHref>
            <a>
              <h1>{tokenMetadata.metadata.name}</h1>
            </a>
          </Link>
        ) : (
          <h1>{tokenMetadata.metadata.name}</h1>
        )}
        <div className={styles.tokenStatus}>
          <span>GEN - 0</span>
          <span>{tokenMetadata.tokenId}</span>
        </div>
      </div>
    </div>
  );
};

NftDetails.propTypes = {
  page: PropTypes.number,
  auctionStatus: PropTypes.shape({
    auctionId: PropTypes.any,
    reservePrice: PropTypes.number,
    auctionCurrency: PropTypes.string,
    endDateTime: PropTypes.string,
    contractAddress: PropTypes.string,
  }),
  tokenMetadata: PropTypes.object,
  img: PropTypes.string,
};

export default NftDetails;
