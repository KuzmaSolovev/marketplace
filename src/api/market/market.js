import axios from '../base';

const getLatestAsks = (params) =>
  axios.get(`/market/getLatestAsks`, { params });
const getLatestAsksPageCount = (params) =>
  axios.get(`/market/getAsksPageCount`, { params });

export default {
  getLatestAsks,
  getLatestAsksPageCount,
};
