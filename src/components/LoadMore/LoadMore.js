import PropTypes from 'prop-types';

import Arrow from '@components/Arrow';

import styles from './LoadMore.module.scss';

const LoadMore = ({ hasNextPage, fetchNextPage }) => {
  if (!hasNextPage) return null;

  return (
    <button className={styles.container} onClick={fetchNextPage}>
      <span>Load more</span>{' '}
      <Arrow className={styles.arrow} size="Large" direction="Down" />
    </button>
  );
};

LoadMore.propTypes = {
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};

LoadMore.defaultProps = {
  hasNextPage: false,
};

export default LoadMore;
