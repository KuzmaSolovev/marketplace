import PropTypes from 'prop-types';
import clsx from 'clsx';

import useCountDown from '@shared/hooks/useCountDown';
import styles from './Counter.module.scss';

const Counter = ({ endDateTime, short }) => {
  const counterStyles = clsx({
    [styles.container]: true,
    [styles.short]: short,
  });
  const { days, hours, minutes, seconds } = useCountDown(endDateTime);
  return (
    <div className={counterStyles}>
      {!short ? <div className={styles.text}>Auction ending in </div> : null}
      <div className={styles.countdown}>
        <div className={styles.time}>
          <span>{days}</span>
          {short ? <span>d</span> : <span>days</span>}
        </div>
        <div className={styles.time}>
          <span>{hours}</span>
          {short ? <span>h</span> : <span>hours</span>}
        </div>
        <div className={styles.time}>
          <span>{minutes}</span>
          {short ? <span>m</span> : <span>min</span>}
        </div>
        <div className={styles.time}>
          <span>{seconds}</span>
          {short ? <span>s</span> : <span>sec</span>}
        </div>
      </div>
    </div>
  );
};

Counter.propTypes = {
  endDateTime: PropTypes.string,
  short: PropTypes.bool,
};

Counter.defaultProps = {
  short: false,
};

export default Counter;
