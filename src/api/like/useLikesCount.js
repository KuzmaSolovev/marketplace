import { useQuery } from 'react-query';
import likeApi from '@api/like/like';

const useLikesCount = (tokenId, contractAddress) => {
  return useQuery(
    ['likes-count', tokenId],
    () => likeApi.getTokenLikesCount({ tokenId, contractAddress }),
    { enabled: !!tokenId },
  );
};

export default useLikesCount;
