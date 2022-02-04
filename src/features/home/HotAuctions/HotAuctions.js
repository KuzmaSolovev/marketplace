import clsx from 'clsx';

import Collection from '@features/collections';
import Loader from '@components/Loader';

import useLastCreatedAuctions from '@api/auction/useLastCreatedAuctions';

import styles from './HotAuctions.module.scss';

const HotAuctions = () => {
  const { data, status } = useLastCreatedAuctions({
    sortBy: 'MostBids',
    max: 10,
    page: 1,
  });

  return (
    <section className={clsx('section section-top', styles.container)}>
      <h2>Hot Auctions </h2>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <Collection collection={data} arrow={'hotAuction'} />
      )}
    </section>
  );
};

export default HotAuctions;
