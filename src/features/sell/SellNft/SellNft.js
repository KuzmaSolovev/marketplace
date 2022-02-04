import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import useMetadata from '@api/media/useMetadata';

import AuctionForm from '@features/sell//AuctionForm';
import NftAuctionCard from '@components/NftAuctionCard';
import NftDescription from '@components/NftDescription';
import NftDetails from '@components/NftDetails';

import constructImageQuery from '@shared/utils/constructImageQuery';

const SellNft = ({ tokenOwner, tokenAddress, tokenId }) => {
  const [tokenMetadata, setTokenMetadata] = useState(null);
  const [imageUri, setImageUri] = useState('');

  const { data, isSuccess } = useMetadata({
    tokenId,
    contractAddress: tokenAddress,
    enabled: !!tokenId,
  });

  useEffect(() => {
    if (!!data) {
      setTokenMetadata({ ...data, tokenOwner });
      setImageUri(constructImageQuery(data.metadata.imageUri));
    }
  }, [data, tokenOwner]);

  return (
    <section className={'section section-top nft-container'}>
      {isSuccess && !!tokenMetadata ? (
        <>
          <NftAuctionCard imageUri={imageUri} />
          <div className="nft-container-details">
            <NftDetails tokenMetadata={tokenMetadata} />
            <NftDescription description={tokenMetadata.metadata.description} />
            <AuctionForm
              tokenId={tokenMetadata.tokenId}
              curator={tokenMetadata.tokenOwner}
            />
          </div>
        </>
      ) : null}
    </section>
  );
};

SellNft.propTypes = {
  tokenOwner: PropTypes.string,
  tokenAddress: PropTypes.string,
  tokenId: PropTypes.string,
};

export default SellNft;
