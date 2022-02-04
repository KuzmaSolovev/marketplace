import PropTypes from 'prop-types';

const UserAccount = PropTypes.shape({
  walletAddress: PropTypes.string,
  username: PropTypes.string,
  customUrl: PropTypes.string,
  bio: PropTypes.string,
  emailAddress: PropTypes.string,
  siteAddress: PropTypes.string,
  twitterUser: PropTypes.string,
  instagramUser: PropTypes.string,
  profileImage: PropTypes.string,
  profileBanner: PropTypes.string,
  lastUpdated: PropTypes.string,
});

export default {
  UserAccount,
};
