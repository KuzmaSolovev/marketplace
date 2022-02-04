import { useQuery } from 'react-query';
import mediaApi from '@api/media/media';

const useMetadata = (params) => {
  const { enabled, ...rest } = params;
  return useQuery(['token-metadata', rest], () => mediaApi.getMetadata(rest), {
    enabled,
  });
};

export default useMetadata;
