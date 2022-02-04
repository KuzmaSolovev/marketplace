import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import Tab from '@components/Tab';

import styles from './Tabs.module.scss';

const Tabs = ({ tabs, currentTab }) => {
  const router = useRouter();

  const onTabChange = (id) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: id },
      },
      null,
      {
        scroll: false,
        shallow: true,
      },
    );
  };

  return (
    <div className={styles.buttonWrapper}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          activeTab={currentTab === tab.id}
          onTabChange={onTabChange}
        />
      ))}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  currentTab: PropTypes.string,
};

export default Tabs;
