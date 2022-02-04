import { QueryClient } from 'react-query';

import axios from 'axios';
import config from '@config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const requestConfig = {
  baseURL: config.api.url,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(requestConfig);

axiosInstance.interceptors.response.use((response) => response.data);

export default axiosInstance;
export { queryClient };
