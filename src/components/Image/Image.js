import PropTypes from 'prop-types';

import styles from './Image.module.scss';

const Image = ({
  tablet,
  desktop,
  defaultSrc,
  altText,
  className,
  width,
  height,
  role,
  ...rest
}) => {
  const imageSrc = defaultSrc || tablet || desktop;
  if (imageSrc) {
    return (
      <picture className={styles.picture}>
        {desktop && <source media={`(min-width: 768px)`} srcSet={desktop} />}
        {tablet && <source media={`(min-width: 1028px)`} srcSet={tablet} />}
        <img
          {...rest}
          decoding="auto"
          src={imageSrc}
          alt={altText || ''}
          loading="lazy"
          className={className}
          role={role}
          width={width}
          height={height}
        />
      </picture>
    );
  } else {
    return null;
  }
};

Image.propTypes = {
  defaultSrc: PropTypes.string,
  tablet: PropTypes.string,
  desktop: PropTypes.string,
  defaultSrc: PropTypes.string,
  altText: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
};

export default Image;
