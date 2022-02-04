import { useQuery } from 'react-query';
import marketApi from '@api/market/market';

const useLatestAsks = ({ queryKey, ...params }, enabled, select) => {
  return useQuery(
    [queryKey, { params }],
    () => marketApi.getLatestAsks({ ...params }),
    { enabled, select },
  );
};

export default useLatestAsks;
