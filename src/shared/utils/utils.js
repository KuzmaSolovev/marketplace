import { utils } from 'ethers';

export default {
  fromWei: (value) => utils.formatEther(value),
  toWei: (value) => utils.parseUnits(value, 'ether').toString(),
  isAddress: (address) => utils.isAddress(address),
};
