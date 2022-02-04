import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Arrow.module.scss';

const Arrow = ({ className, size, direction, onClick }) => {
  const arrowContainer = clsx({
    [styles.container]: true,
    [className]: !!className,
    [styles.small]: size === 'Small',
    [styles.large]: size === 'Large',
  });

  const arrowStyles = clsx({
    [styles.arrow]: true,
    [styles.arrowRightMargin]: direction === 'Right',
    [styles.arrowLeftMargin]: direction === 'Left',
    [styles.left]: direction === 'Left',
    [styles.right]: direction === 'Right',
    [styles.up]: direction === 'Up',
    [styles.down]: direction === 'Down',
  });

  return (
    <div onClick={onClick} className={arrowContainer}>
      <div className={arrowStyles} />
    </div>
  );
};

Arrow.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['Small', 'Large']),
  direction: PropTypes.oneOf(['Up', 'Right', 'Down', 'Left']),
  onClick: PropTypes.func,
};

export default Arrow;
