import storage from '@shared/utils/storage';
import constants from './constants';
import { metaMaskConnector } from '../connectors';

const clearCachedConnector = () => {
  storage.remove(constants.CACHED_CONNECTOR_ID_KEY);
};

const cacheConnector = (connector) => {
  storage.save(constants.CACHED_CONNECTOR_ID_KEY, { id: connector.id });
};

const getCachedConnector = () => {
  const cachedConnector = storage.get(constants.CACHED_CONNECTOR_ID_KEY);
  if (cachedConnector) {
    return metaMaskConnector;
  }
  return null;
};

export default {
  clearCachedConnector,
  cacheConnector,
  getCachedConnector,
};
