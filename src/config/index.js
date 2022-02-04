export default {
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
  rpcAddress: process.env.NEXT_PUBLIC_RPC_URL,
  explorerAddress: process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL,
  maticContractAddress: process.env.NEXT_PUBLIC_MATIC_CONTRACT_ADDRESS,
  contracts: {
    nftContractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
    mediaAddress: process.env.NEXT_PUBLIC_MEDIA_CONTRACT_ADDRESS,
    auctionFactory: process.env.NEXT_PUBLIC_AUCTION_FACTORY_CONTRACT_ADDRESS,
    marketAddress: process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS,
  },
  api: {
    url: process.env.NEXT_PUBLIC_API_URL,
  },
};
