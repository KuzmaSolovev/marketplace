import { useQuery } from 'react-query';
import { useWeb3State } from '@features/web3/context';
import utils from '@shared/utils/utils';
import { ACCOUNT_BALANCE } from '@api/constants/queryKeys';

const useAccountBalance = (enabled) => {
  const { web3, currentAddress } = useWeb3State();

  return useQuery(
    [ACCOUNT_BALANCE, currentAddress],
    async () => {
      const userBalance = await web3.getBalance(currentAddress?.toLowerCase());
      return utils.fromWei(userBalance.toString());
    },
    {
      enabled: !!(web3 && currentAddress) && enabled,
    },
  );
};

export default useAccountBalance;
