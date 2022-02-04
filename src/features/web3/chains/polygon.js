export default {
  chainId: `0x${Number(process.env.NEXT_PUBLIC_CHAIN_ID).toString(16)}`,
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
  nativeCurrency: {
    name: process.env.NEXT_PUBLIC_NATIVE_CURRENCY,
    symbol: process.env.NEXT_PUBLIC_NATIVE_CURRENCY_SYMBOL,
    decimals: 18,
  },
  rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
  blockExplorerUrls: [process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL],
};
