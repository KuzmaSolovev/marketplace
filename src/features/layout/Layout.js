import PropTypes from 'prop-types';

import SideBar from '@components/SideBar';
import ContentLayout from '@components/ContentLayout';

const Layout = ({ children }) => {
  return (
    <div className="pageLayout">
      <SideBar />
      <ContentLayout>{children}</ContentLayout>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
