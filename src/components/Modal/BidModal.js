import PropTypes from 'prop-types';
import clsx from 'clsx';

import ActionButton from '@components/Button';
import Loader from '@components/Loader';

import styles from './BidModal.module.scss';

const BidModal = ({
  currentBalance,
  price,
  handlePlaceBid,
  handleCancel,
  isBidding,
  onAmountEnter,
}) => {
  return (
    <div className="overlay">
      <div className={clsx('container', styles.container)}>
        <h3 className="containerTitle">Place your bid!</h3>
        <div className={styles.price}>
          <div>
            <span>Current bid </span>
            <span>{price.currentBid || 0}</span>
          </div>
          <div className={styles.reservePrice}>
            <span>Reserve price </span>
            <span>{price.reservePrice || 0}</span>
          </div>
        </div>
        <div className={styles.notificationText}>
          If there is no bid, your bid should be greater or equal than reserve
          price otherwise 5% higher
        </div>
        <div className={styles.currentBalance}>
          Current Balance: <span>{currentBalance}</span> MATIC
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="number"
            placeholder="Enter bid here"
            required
            name="price"
            min="0"
            step="any"
            onChange={onAmountEnter}
          />
          <span>MATIC</span>
        </div>
        <div className={styles.actionButtons}>
          <ActionButton
            className={styles.cancelAction}
            onClick={handleCancel}
            label="Cancel"
          />
          <ActionButton
            className={styles.placeBidAction}
            onClick={handlePlaceBid}
            label="Place bid"
            disabled={isBidding}
          />
        </div>
        {isBidding ? (
          <div className={styles.processingTransaction}>
            <Loader />
            <span>Processing transaction...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

BidModal.propTypes = {
  currentBalance: PropTypes.string,
  price: PropTypes.shape({
    currentBid: PropTypes.string,
    reservePrice: PropTypes.string,
  }),
  handlePlaceBid: PropTypes.func,
  handleCancel: PropTypes.func,
  onAmountEnter: PropTypes.func,
  isBidding: PropTypes.bool,
};

BidModal.defaultProps = {
  isBidding: false,
};

export default BidModal;
