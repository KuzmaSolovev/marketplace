import PropTypes from 'prop-types';

import styles from './NftDescription.module.scss';

const NftDescription = ({ description }) => {
  return (
    <div className={styles.container}>
      <span>Description</span>
      <p>{description}</p>
    </div>
  );
};

NftDescription.propTypes = {
  description: PropTypes.string,
};

export default NftDescription;
