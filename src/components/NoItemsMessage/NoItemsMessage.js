import { useRouter } from 'next/router';

import ActionButton from '@components/Button';

import styles from './NoItemsMessage.module.scss';

const NoItemsMessage = () => {
  const Router = useRouter();

  return (
    <div className={styles.messageWrapper}>
      <h3 className={styles.messageTitle}>No items found</h3>
      <p className={styles.messageText}>
        Browse something for you on our Kitsumon marketplace
      </p>
      <ActionButton
        className={styles.messageButton}
        label="Browse marketplace"
        onClick={() => Router.push('/explore')}
      />
    </div>
  );
};

export default NoItemsMessage;
