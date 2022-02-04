import { useQuery } from 'react-query';

import userApi from '@api/user/user';

const useFetchUserProfile = (walletAddress) => {
  return useQuery(
    ['user', walletAddress],
    () => userApi.getUserProfile(walletAddress),
    { enabled: !!walletAddress },
  );
};

export default useFetchUserProfile;
