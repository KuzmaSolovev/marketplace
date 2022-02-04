import PropTypes from 'prop-types';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import ActionButton from '@components/Button';
import BidModal from '@components/Modal';
import Counter from '@features/counter';
import useLatestAuctionBids from '@api/auction/useLatestAuctionBids';
import {
  LAST_CREATED_AUCTIONS,
  LATEST_AUCTION_BIDS,
  LATEST_AUCTION_EVENT,
} from '@api/constants/queryKeys';

import { queryClient } from '@api/base';

import { useWeb3State } from '@features/web3/context';
import useAutionBidAction from '@features/hooks/useAuctionBidAction';

import useAccountBalance from '@contract/hooks/useAccountBalance';

import utils from '@shared/utils/utils';

import styles from './PlaceBid.module.scss';

const PlaceBid = ({ auctionStatus }) => {
  const { currentAddress } = useWeb3State();
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [price, setPrice] = useState({
    currentBid: '0',
    reservePrice: utils.fromWei(auctionStatus.reservePrice.toString()),
  });
  const previousBid = useRef('0');
  const [openBidModal, setOpenBidModal] = useState(false);
  const { data: maticBalance, refetch: refetchAccountBalance } =
    useAccountBalance(false);

  const select = (data) => data[0];

  const { data: bids } = useLatestAuctionBids(
    {
      auctionId: auctionStatus.auctionId,
    },
    !!auctionStatus.auctionId,
    select,
  );

  const queriesToRefetch = () => {
    queryClient.invalidateQueries(LAST_CREATED_AUCTIONS);
    queryClient.invalidateQueries(LATEST_AUCTION_EVENT);
    queryClient.invalidateQueries(LATEST_AUCTION_BIDS);
  };

  const onSuccess = async () => {
    toast.info('Price update can take a minute.');
    setTimeout(() => {
      queriesToRefetch();
      toast.success('Your bid has been placed');
    }, 40000);
  };

  const onError = () => {
    toast.error('Transaction failed! Please try again later.');
  };

  const { sendTransaction, isAuctionStillActive, isLoading } =
    useAutionBidAction(auctionStatus.endDateTime, onSuccess, onError);

  useEffect(() => {
    if (!!bids) {
      setPrice((prevState) => ({
        ...prevState,
        currentBid: utils.fromWei(bids.value.toString()),
      }));
      previousBid.current = utils.fromWei(bids.value.toString());
    } else {
      setPrice((prevState) => ({ ...prevState, currentBid: '0' }));
      previousBid.current = '0';
    }
  }, [bids]);

  const onAmountEnter = (e) => {
    setEnteredAmount(e.target.value);
  };

  const handleCloseModal = () => {
    setOpenBidModal(false);
  };

  const handlePlaceBid = async () => {
    if (!currentAddress) {
      toast.info('Please connect your wallet for bidding this item!');
      return;
    }

    if (enteredAmount > maticBalance) {
      toast.error('Insuficient MATIC balance for bid this item!');
    } else if (enteredAmount <= price.currentBid * 1.05) {
      toast.error('Your bid should be 5% higher than current bid!');
    } else if (enteredAmount < price.reservePrice) {
      toast.error('Placed bid must be equal to or higher than reserve price!');
    } else {
      await sendTransaction({
        auctionId: auctionStatus.auctionId,
        value: enteredAmount,
      });
    }
    setOpenBidModal(false);
  };

  const redeemAuction = async () => {
    if (!currentAddress) {
      toast.info('Please connect your wallet to end this auction!');
      return;
    }

    await sendTransaction({ auctionId: auctionStatus.auctionId });
  };

  return (
    <div className={styles.container}>
      <div className={styles.auctionStatus}>
        <div className={styles.bidStatus}>
          {bids && bids.length !== 0 ? (
            <>
              <div className={styles.title}>Current bid</div>
              <div className={styles.currentBid}>
                <span>{price.currentBid} MATIC</span>
              </div>
            </>
          ) : (
            <div>
              <div className={styles.title}>Reserved Price</div>
              <div className={styles.reservedPrice}>
                {price.reservePrice || 0} MATIC
              </div>
            </div>
          )}
        </div>
        <div className={styles.deadline}>
          <Counter endDateTime={auctionStatus.endDateTime} />
        </div>
      </div>

      <ActionButton
        label={isAuctionStillActive ? 'Place bid' : 'End auction'}
        className={!isAuctionStillActive ? styles.endAuction : ''}
        handler={() => {
          if (!isAuctionStillActive) {
            redeemAuction();
          } else {
            if (!currentAddress) {
              toast.info('Please connect your wallet for bidding this item!');
              return;
            } else {
              refetchAccountBalance();
              setOpenBidModal((prevstate) => !prevstate);
            }
          }
        }}
        disabled={openBidModal || isLoading}
      />
      {openBidModal ? (
        <BidModal
          currentBalance={maticBalance}
          price={price}
          handleCancel={handleCloseModal}
          handlePlaceBid={handlePlaceBid}
          onAmountEnter={onAmountEnter}
          isBidding={isLoading}
        />
      ) : null}
    </div>
  );
};

PlaceBid.propTypes = {
  auctionStatus: PropTypes.shape({
    auctionId: PropTypes.any,
    reservePrice: PropTypes.number,
    auctionCurrency: PropTypes.string,
    endDateTime: PropTypes.string,
  }),
};

export default PlaceBid;
