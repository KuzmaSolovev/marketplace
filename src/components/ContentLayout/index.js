import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const ContentLayout = ({ children }) => {
  return (
    <div className="contentLayout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
ContentLayout.propTypes = {
  children: PropTypes.node,
};
export default ContentLayout;
