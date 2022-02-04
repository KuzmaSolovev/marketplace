import * as filters from '@shared/constants/filters';

const categories = [{ id: 1, name: 'eggs', label: 'Eggs' }];

const saleType = [
  { id: 1, name: filters.AUCTION, label: 'Auction' },
  { id: 2, name: filters.BUY_NOW, label: 'Buy now' },
];

const sortBy = [
  { id: 1, name: filters.NEWEST_ITEMS, label: 'Newest items' },
  { id: 2, name: filters.ENDING_SOON, label: 'Ending soon' },
  { id: 3, name: filters.HIGHEST_BIDS, label: 'Highest bids' },
  { id: 4, name: filters.MOST_BIDS, label: 'Most bids' },
  { id: 5, name: filters.LOWEST_PRICE, label: 'Lowest price' },
  { id: 6, name: filters.HIGHEST_PRICE, label: 'Highest price' },
];
export { categories, saleType, sortBy };
