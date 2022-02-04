import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Tab.module.scss';

const Tab = ({ tab, activeTab, onTabChange }) => {
  const tabButtonStyles = clsx({
    [styles.button]: true,
    [styles.buttonSale]: tab.id === 'on_sale',
    [styles.buttonOwned]: tab.id === 'owned',
    [styles.buttonAuction]: tab.id === 'auction',
    [styles.buttonActive]: activeTab,
    [styles.buttonNotActive]: !activeTab,
  });

  return (
    <button
      key={tab.id}
      onClick={() => onTabChange(tab.id)}
      className={clsx(tabButtonStyles)}>
      {tab.label}
    </button>
  );
};

Tab.propTypes = {
  tab: PropTypes.object,
  activeTab: PropTypes.bool,
  onTabChange: PropTypes.func,
};

export default Tab;
