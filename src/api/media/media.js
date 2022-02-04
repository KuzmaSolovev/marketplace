import axios from '../base';

const getMetadata = (params) => axios.get(`/media/getMetadata`, { params });

export default {
  getMetadata,
};
