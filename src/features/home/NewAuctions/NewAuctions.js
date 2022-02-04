import clsx from 'clsx';

import Collection from '@features/collections';
import Loader from '@components/Loader';

import useLastCreatedAuctions from '@api/auction/useLastCreatedAuctions';

import styles from './NewAuctions.module.scss';

const NewAuctions = () => {
  const { data } = useLastCreatedAuctions({
    max: 10,
    page: 1,
  });

  return (
    <section className={clsx('section section-top', styles.container)}>
      <h2>New Auctions </h2>
      {data ? (
        <Collection collection={data} arrow={'newAuction'} />
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default NewAuctions;
