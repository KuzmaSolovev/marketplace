import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useMetadata from '@api/media/useMetadata';

import NftAuctionCard from '@components/NftAuctionCard';
import NftDetails from '@components/NftDetails';
import NftDescription from '@components/NftDescription';
import NftBuyDetails from '@components/NftBuyDetails';

import constructImageQuery from '@shared/utils/constructImageQuery';

import { useWeb3State } from '@features/web3/context';
import useBuyNowAction from '@features/hooks/useBuyNowAction';

import useLatestAsks from '@api/market/useLatestAsks';

import { LATEST_ASKS, LATEST_ASK_BY_TOKEN_ID } from '@api/constants/queryKeys';
import { queryClient } from '@api/base';

import utils from '@shared/utils/utils';

const BuyNft = ({ tokenAddress, tokenId }) => {
  const { currentAddress } = useWeb3State();
  const { push } = useRouter();

  const [nftMetadata, setNftMedatada] = useState(null);
  const [imageUri, setImageUri] = useState('');

  const { data: nftData, isSuccess } = useMetadata({
    tokenId,
    contractAddress: tokenAddress,
    enabled: !!tokenAddress,
  });

  const select = (data) => data[0];

  const { data: latestAsksData } = useLatestAsks(
    {
      queryKey: LATEST_ASK_BY_TOKEN_ID,
      tokenId,
    },
    !!nftData,
    select,
  );

  const onSuccess = () => {
    queryClient.invalidateQueries([LATEST_ASKS]);
    push(`/accounts/${currentAddress}/tab=owned`);
  };
  const onError = () => {};

  const { sendTransaction } = useBuyNowAction(onSuccess, onError);

  useEffect(() => {
    if (!!nftData && !!latestAsksData) {
      setNftMedatada({
        ...nftData,
        tokenOwner: latestAsksData.senderAddress,
        reservedPrice: utils.fromWei(latestAsksData.askDAO.amount.toString()),
      });
      setImageUri(constructImageQuery(nftData.metadata.imageUri));
    }
  }, [latestAsksData, nftData]);

  const buyNow = () => {
    if (!currentAddress) {
      return;
    }

    sendTransaction({
      tokenId,
      tokenOwner: latestAsksData.walletAddress,
      amount: latestAsksData.askDAO.amount,
      currency: latestAsksData.askDAO.currency,
    });
  };

  return (
    <section className={'section section-top nft-container'}>
      {isSuccess && !!nftMetadata ? (
        <>
          <NftAuctionCard imageUri={imageUri} />
          <div className="nft-container-details">
            <NftDetails tokenMetadata={nftMetadata} />
            <NftDescription description={nftMetadata.metadata.description} />
            <NftBuyDetails
              reservedPrice={nftMetadata.reservedPrice}
              handler={buyNow}
            />
          </div>
        </>
      ) : null}
    </section>
  );
};

BuyNft.propTypes = {
  tokenAddress: PropTypes.string,
  tokenId: PropTypes.string,
};

export default BuyNft;
