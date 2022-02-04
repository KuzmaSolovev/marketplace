import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

import NftCardWrapper from '@components/NftCardWrapper';

import { useWeb3State } from '@features/web3/context';
import useFetchUserProfile from '@api/user/useFetchUserProfile';

import constructImageQuery from '@shared/utils/constructImageQuery';

import avatar from '@assets/images/avatar-small-placeholder.png';

import NftCardAction from '@components/NftCardAction';

const NftTradeCard = ({ card, actionType, handler }) => {
  const { currentAddress } = useWeb3State();
  const [data, setData] = useState();

  const { tokenMetadata } = card;

  const { data: user } = useFetchUserProfile(
    card.tokenOwner || card.senderAddress || currentAddress,
  );

  const profileImageUrl = user?.profileImage
    ? constructImageQuery(user?.profileImage)
    : avatar.src;

  useEffect(() => {
    if (!!tokenMetadata && Object.keys(tokenMetadata).length !== 0) {
      setData({
        ...tokenMetadata,
        imageUrl: constructImageQuery(tokenMetadata.metadata.imageUri),
      });
    }
  }, [tokenMetadata, card]);
  return (
    <NftCardWrapper
      nftDetails={{
        name: data?.metadata?.name,
        imageUri: data?.imageUrl,
        nftGeneration: 'GEN-0',
        userAvatar: profileImageUrl,
        tokenId: tokenMetadata.tokenId,
        ask: card.askDAO,
        tokenOwner: card.tokenOwner || currentAddress,
        tokenAddress: tokenMetadata.contractAddress,
      }}>
      {currentAddress !== card.tokenOwner ? (
        <NftCardAction
          actionType={actionType}
          handler={() => handler(tokenMetadata.tokenId)}
        />
      ) : null}
    </NftCardWrapper>
  );
};

NftTradeCard.propTypes = {
  card: PropTypes.shape({
    auctionId: PropTypes.any,
    tokenId: PropTypes.any,
    tokenMetadata: PropTypes.shape({
      tokenId: PropTypes.any,
      contractAddress: PropTypes.string,
      metadata: PropTypes.shape({
        name: PropTypes.string,
        imageUri: PropTypes.string,
      }),
    }),
    tokenOwner: PropTypes.string,
    senderAddress: PropTypes.string,
    askDAO: PropTypes.shape({ amount: PropTypes.number }),
  }),
  actionType: PropTypes.oneOf(['Buy', 'Sell']),
  handler: PropTypes.func,
};

NftTradeCard.defaultProps = {
  type: 'Buy',
};

export default NftTradeCard;
