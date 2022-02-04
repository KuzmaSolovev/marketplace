import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useState } from 'react';

import Bid from '@components/Bid';
import Arrow from '@components/Arrow';

import styles from './AuctionBiddingHistory.module.scss';

const AuctionBiddingHistory = ({ bids }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstBid, ...historyBids] = bids;

  const onCollapseClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.collapseWrapper}>
            <span>Bidding History</span>
            {bids.length > 1 && (
              <Arrow
                size="Large"
                direction="Down"
                className={clsx(
                  `${styles.collapseArrow}  ${isOpen && styles.rotateArrow}`,
                )}
                onClick={onCollapseClick}
              />
            )}
          </div>
          <div>
            <Bid key={firstBid.created} bid={firstBid} />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          `${styles.contentWrapperClosed} ${
            isOpen && styles.contentWrapperOpen
          }`,
        )}>
        {historyBids.map((bid) => (
          <Bid key={bid.created} bid={bid} />
        ))}
      </div>
    </>
  );
};

AuctionBiddingHistory.propTypes = {
  bids: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string,
      value: PropTypes.number,
      firstBid: PropTypes.bool,
      created: PropTypes.number,
    }),
  ),
  handleCollapse: PropTypes.func,
};

export default AuctionBiddingHistory;
