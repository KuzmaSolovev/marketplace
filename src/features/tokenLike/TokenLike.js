import PropTypes from 'prop-types';

import { useMutation } from 'react-query';

import Like from '@components/Like';

import { useWeb3State, useWeb3Actions } from '@features/web3/context';
import useLikesForToken from '@api/like/useLikesForToken';
import useLikesCount from '@api/like/useLikesCount';
import { metaMaskConnector } from '@features/web3/connectors';

import { queryClient } from '@api/base';
import likeApi from '@api/like/like';

const TokenLike = ({ tokenId, tokenAddress }) => {
  const { currentAddress, signer } = useWeb3State();
  const { connect } = useWeb3Actions();

  const { data: likeCountData } = useLikesCount(tokenId, tokenAddress);
  const { data: likeData } = useLikesForToken(
    {
      walletAddress: currentAddress,
      tokenId: tokenId?.toString(),
      contractAddress: tokenAddress,
    },
    !!tokenId,
  );

  const toggleTokenLike = useMutation(
    ({ body, signature }) =>
      likeApi.toggleLikeForToken({
        signedPayload: JSON.stringify({ ...body }),
        signature,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          'token-likes',
          { walletAddress: currentAddress, tokenId: tokenId.toString() },
        ]);
        queryClient.invalidateQueries(['likes-count', tokenId]);
      },
    },
  );

  const toggleLike = async (e) => {
    e.stopPropagation();
    if (!signer) {
      connect(metaMaskConnector);
      return;
    }

    const timestamp = new Date().toISOString();
    const body = {
      walletAddress: currentAddress,
      contractAddress: tokenAddress,
      tokenId: tokenId?.toString(),
      timestamp,
    };

    const signature = await signer.signMessage(JSON.stringify(body));

    toggleTokenLike.mutate({ body, signature });
  };

  const isLiked = likeData?.tokenId === tokenId;

  return (
    <Like
      toggleLike={toggleLike}
      numberOfLikes={likeCountData}
      isLiked={isLiked}
    />
  );
};

TokenLike.propTypes = {
  tokenId: PropTypes.number,
  tokenAddress: PropTypes.string,
};

export default TokenLike;
