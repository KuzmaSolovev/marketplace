import PropTypes from 'prop-types';
import clsx from 'clsx';

import Search from '@assets/icons/Search.svg';

import styles from './SearchInput.module.scss';

const SearchInput = ({ className, onSearch }) => {
  const searchStyles = clsx({
    [styles.container]: true,
    [className]: !!className,
  });
  return (
    <div className={searchStyles}>
      <img src={Search.src} width="12" height="12" alt="Search icon" />
      <input
        aria-label="Search"
        autoComplete="on"
        id="search-input"
        name="search-input"
        placeholder="Search"
        type="search"
        onChange={onSearch}
      />
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
};

SearchInput.defaultProps = {
  onSearch: () => {},
};

export default SearchInput;
