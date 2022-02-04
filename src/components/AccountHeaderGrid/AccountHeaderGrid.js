import types from '@shared/types/user';

import Image from '@components/Image';
import AccountAddress from '@components/AccountAddress';

import verifiedBadge from '@assets/icons/verified-badge.svg';

import userAvatar from '@assets/images/user-avatar.jpg';
import backgroundImg from '@assets/images/background-image.png';

import constructImageQuery from '@shared/utils/constructImageQuery';

import styles from './AccountHeaderGrid.module.scss';

const AccountHeaderGrid = (account) => {
  const { walletAddress, username, profileImage, profileBanner } = account;
  const profileImageUrl = profileImage
    ? constructImageQuery(profileImage)
    : userAvatar.src;
  const profileBannerUrl = profileBanner
    ? constructImageQuery(profileBanner)
    : backgroundImg.src;
  return (
    <section className={styles.accountHeaderGrid}>
      <div
        className={styles.backgroundImg}
        style={{
          backgroundImage: `url(${profileBannerUrl})`,
        }}
      />
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarImg}>
          <Image
            defaultSrc={profileImageUrl}
            width="96"
            height="96"
            altText="user avatar"
          />
        </div>
        {true ? (
          <div className={styles.verifiedBadge}>
            <Image
              defaultSrc={verifiedBadge.src}
              width="16"
              height="16"
              altText="verified badge"
            />
          </div>
        ) : null}
      </div>
      {username ? (
        <div className={styles.accountName}>
          <span>{username}</span>
        </div>
      ) : null}
      <div className={styles.accountAddress}>
        <AccountAddress address={walletAddress} />
      </div>
    </section>
  );
};

AccountHeaderGrid.propTypes = {
  account: types.UserAccount,
};

export default AccountHeaderGrid;
