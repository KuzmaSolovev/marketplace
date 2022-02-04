import PropTypes from 'prop-types';

import ActionButton from '@components/Button';

import styles from './NftCardAction.module.scss';

const NftCardAction = ({ actionType, handler }) => {
  return (
    <div className={styles.btnSale}>
      <ActionButton
        className={styles.btnStyle}
        label={actionType === 'Buy' ? 'Buy now' : 'Sell item'}
        handler={handler}
      />
    </div>
  );
};

NftCardAction.propTypes = {
  actionType: PropTypes.oneOf(['Buy', 'Sell']),
  handler: PropTypes.func,
};

export default NftCardAction;
