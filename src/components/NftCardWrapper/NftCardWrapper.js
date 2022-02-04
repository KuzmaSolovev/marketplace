import PropTypes from 'prop-types';

import TokenLike from '@features/tokenLike';
import Image from '@components/Image';
import ActionMenuDropdown from '@components/ActionMenuDropdown';
import { useWeb3State } from '@features/web3/context';

import utils from '@shared/utils/utils';

import styles from './NftCardWrapper.module.scss';

const NftCardWrapper = ({ nftDetails, children }) => {
  const { currentAddress } = useWeb3State();
  const {
    name,
    nftGeneration,
    userAvatar,
    imageUri,
    tokenId,
    tokenOwner,
    tokenAddress,
  } = nftDetails;
  return (
    <div className={styles.cardWrapper}>
      {tokenOwner === currentAddress && (
        <ActionMenuDropdown className={styles.actionCardMenu} />
      )}
      <div className={styles.cardAvatar}>
        <Image
          defaultSrc={userAvatar}
          width={'24'}
          height={'24'}
          altText="User avatar"
        />
      </div>
      <div className={styles.cardImg}>
        <Image
          defaultSrc={imageUri}
          width={'140'}
          height={'191'}
          altText={`${name} image`}
        />
      </div>
      <span className={styles.cardGeneration}>{nftGeneration}</span>
      <div className={styles.cardDescription}>
        <span className={styles.nftName}>{name}</span>
        <span className={styles.likeCount}>
          <TokenLike tokenId={tokenId} tokenAddress={tokenAddress} />
        </span>
      </div>
      {nftDetails?.ask?.amount ? (
        <div className={styles.nftReservedPrice}>
          <span>Reserved price</span>
          <span>{utils.fromWei(nftDetails.ask.amount.toString())} MATIC</span>
        </div>
      ) : null}

      {children}
    </div>
  );
};

NftCardWrapper.propTypes = {
  children: PropTypes.node,
  nftDetails: PropTypes.shape({
    name: PropTypes.string,
    nftGeneration: PropTypes.string,
    userAvatar: PropTypes.string,
    imageUri: PropTypes.string,
    tokenId: PropTypes.any,
    tokenOwner: PropTypes.string,
    tokenAddress: PropTypes.string,
    ask: PropTypes.shape({ amount: PropTypes.number }),
  }),
};

export default NftCardWrapper;
