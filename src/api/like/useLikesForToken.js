import { useQuery } from 'react-query';
import likeApi from '@api/like/like';

const useLikesForToken = (params, enabled) => {
  return useQuery(
    ['token-likes', params],
    () => likeApi.getLikeForToken(params),
    { enabled },
  );
};

export default useLikesForToken;
