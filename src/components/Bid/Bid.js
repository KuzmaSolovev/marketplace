import PropTypes from 'prop-types';

import Image from '@components/Image';

import useFetchUserProfile from '@api/user/useFetchUserProfile';
import constructImageQuery from '@shared/utils/constructImageQuery';
import utils from '@shared/utils/utils';

import userAvatar from '@assets/images/avatar-small-placeholder.png';

import styles from './Bid.module.scss';

const Bid = ({ bid }) => {
  const { data: user } = useFetchUserProfile(bid.sender);

  const profileImageUrl = user?.profileImage
    ? constructImageQuery(user.profileImage)
    : userAvatar.src;

  return (
    <div className={styles.container}>
      <Image
        defaultSrc={profileImageUrl}
        width="32"
        height="32"
        altText="Avatar image"
      />
      <div>
        <div>
          Bid{' '}
          <span className={styles.bold}>
            {utils.fromWei(bid.value.toString())} MATIC
          </span>
        </div>
        <div className={styles.text}>
          <span>
            by{' '}
            <span className={styles.bold}>
              {user?.username || `${bid.sender.slice(0, 12)}...`}{' '}
            </span>
          </span>
          <span>
            at{' '}
            <span className={styles.bold}>
              {new Date(bid.created * 1000).toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

Bid.propTypes = {
  bid: PropTypes.shape({
    value: PropTypes.number,
    sender: PropTypes.string,
    created: PropTypes.number,
  }),
};

export default Bid;
