import { useQuery } from 'react-query';

import useMediaContracts from '@contract/hooks/useMediaContracts';

const useOwnedTokens = ({ address, enabled = true }) => {
  const tokenOwnedSizeContract = useMediaContracts();

  return useQuery(
    ['owned-tokens', address],
    async () => {
      const numberOfTokens = await tokenOwnedSizeContract.getTokenOwnedSize(
        address,
      );

      const tokenIds = [];

      for (let index = 0; index < parseInt(numberOfTokens); index++) {
        const res = await tokenOwnedSizeContract.getTokenByAddress(
          address,
          index,
        );
        tokenIds.push(res);
      }

      return tokenIds;
    },
    {
      enabled: !!tokenOwnedSizeContract && !!address && enabled,
      select: (data) => {
        return data.map((d) => parseInt(d));
      },
    },
  );
};

export default useOwnedTokens;
