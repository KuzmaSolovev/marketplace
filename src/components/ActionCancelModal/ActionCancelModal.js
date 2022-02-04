import PropTypes from 'prop-types';
import clsx from 'clsx';

import Image from '@components/Image';
import ActionButton from '@components/Button';

import styles from './ActionCancelModal.module.scss';

const ActionCancelModal = ({ img, nftName, setSelectedAction }) => {
  return (
    <div className="overlay">
      <div className={clsx('container', styles.container)}>
        <h3 className="containerTitle">Cancel auction listing</h3>
        <div>
          <Image
            className={styles.imgWrapper}
            defaultSrc={img}
            width="158"
            height="158"
          />
          <h3>{nftName}</h3>
        </div>
        <ActionButton
          label="Cancel"
          className={styles.cancelButton}
          onClick={() => setSelectedAction('')}
        />
      </div>
    </div>
  );
};

ActionCancelModal.propTypes = {
  img: PropTypes.string,
  nftName: PropTypes.string,
  setSelectedAction: PropTypes.func,
};

export default ActionCancelModal;
