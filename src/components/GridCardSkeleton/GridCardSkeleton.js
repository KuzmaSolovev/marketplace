import styles from './GridCardSkeleton.module.scss';

const GridCardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.avatar} />
      <div className={styles.imagePlaceholder} />

      <div className={styles.name} />
    </div>
  );
};

export default GridCardSkeleton;
