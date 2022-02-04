import PropTypes from 'prop-types';
import clsx from 'clsx';

import Image from '@components/Image';

import like from '@assets/icons/heart.svg';
import liked from '@assets/icons/red-heart.svg';

import styles from './Like.module.scss';

const Like = ({ toggleLike, numberOfLikes, isLiked }) => {
  const likeStyles = clsx({
    [styles.container]: true,
    [styles.liked]: isLiked,
  });
  return (
    <div className={likeStyles}>
      {numberOfLikes}
      <button onClick={toggleLike}>
        <Image
          defaultSrc={isLiked ? liked.src : like.src}
          width="16"
          height="16"
          altText="Like icon"
        />
      </button>
    </div>
  );
};

Like.propTypes = {
  toggleLike: PropTypes.func,
  numberOfLikes: PropTypes.number,
  isLiked: PropTypes.bool,
};

Like.defaultProps = {
  isLiked: false,
};

export default Like;
