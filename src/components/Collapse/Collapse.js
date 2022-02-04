import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useState } from 'react';

import chevron from '@assets/icons/chevron.svg';

import styles from './Collapse.module.scss';

const Collapse = ({ items, current, setCurrent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onCollapseClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setCurrent(e.target.innerHTML);
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collapseWrapper} onClick={onCollapseClick}>
        <div className={styles.collapsible}>{current}</div>
        <img
          className={clsx(
            `${styles.collapseArrow}  ${isOpen && styles.rotateArrow}`,
          )}
          src={chevron.src}
          alt="Arrow icon"
          width="14"
          height="14"
        />
      </div>
      <div
        className={clsx(
          `${styles.contentWrapperClosed}  ${
            isOpen && styles.contentWrapperOpen
          }`,
        )}>
        {Array(items)
          .fill()
          .map((_, index) => (
            <span
              className={styles.number}
              key={index}
              value={index}
              onClick={(e) => handleClick(e)}>
              {index}
            </span>
          ))}
      </div>
    </div>
  );
};

Collapse.propTypes = {
  items: PropTypes.number,
  current: PropTypes.string,
  setCurrent: PropTypes.func,
};

export default Collapse;
