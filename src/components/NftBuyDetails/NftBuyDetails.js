import ActionButton from '@components/Button';
import PropTypes from 'prop-types';

import styles from './NftBuyDetails.module.scss';

const NftBuyDetails = ({ reservedPrice, handler }) => {
  return (
    <div className={styles.container}>
      <span>
        Reserved price: <span>{reservedPrice || '0'} MATIC</span>
      </span>
      <ActionButton label="Buy now" handler={handler} />
    </div>
  );
};

NftBuyDetails.propTypes = {
  reservedPrice: PropTypes.string,
  handler: PropTypes.func,
};

export default NftBuyDetails;
