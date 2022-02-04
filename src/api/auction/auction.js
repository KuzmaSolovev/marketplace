import axios from '../base';

const getLatestAuctionEventsByAuctionId = (params) =>
  axios.get('/auction/getLatestAuctionEvents', { params });

const getLatestAuctionsCreated = (params) =>
  axios.get('/auction/getLatestAuctionsCreated', { params });

const getAuctionCreatedPageCount = (params) =>
  axios.get('/auction/auctionCreatedPageCount', { params });

const getLatestAuctionBids = (params) =>
  axios.get('/auction/getLatestAuctionBids', { params });

export default {
  getLatestAuctionEventsByAuctionId,
  getLatestAuctionsCreated,
  getAuctionCreatedPageCount,
  getLatestAuctionBids,
};
