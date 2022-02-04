import clsx from 'clsx';
import PropTypes from 'prop-types';

import { useState } from 'react';

import RadioGroup from '@components/Input/RadioGroup';

import { categories, saleType, sortBy } from '@shared/enums/explore';
import * as filters from '@shared/constants/filters';

import chevron from '@assets/icons/chevron.svg';

import styles from './NftFilter.module.scss';

const NftFilter = ({
  control,
  handleSaleTypeChange,
  handleSortByChange,
  saleTypeFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onCollapseClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        `${styles.filterWrapper} ${isOpen && styles.filterWrapperShadow}`,
      )}>
      <div className={styles.collapseWrapper} onClick={onCollapseClick}>
        <h3 className={styles.collapsibleTitle}>Filters</h3>
        <img
          className={clsx(
            `${styles.collapseArrow}  ${isOpen && styles.rotateArrow}`,
          )}
          src={chevron.src}
          alt="Arrow icon"
          width="16"
          height="16"
        />
      </div>
      <div
        className={clsx(
          `${styles.formWrapperClosed}  ${isOpen && styles.formWrapperOpen}`,
        )}>
        <form>
          <div className={styles.formSection}>
            <h3>Item categories</h3>
            <ul className={styles.ulGrid}>
              <RadioGroup name="category" data={categories} control={control} />
            </ul>
          </div>

          <div className={styles.formSection}>
            <h3>Sale type</h3>
            <ul className={styles.ulGrid}>
              <RadioGroup
                name="saleType"
                data={saleType}
                control={control}
                handleChange={handleSaleTypeChange}
              />
            </ul>
          </div>

          <div className={styles.formSection}>
            <h3>Sort by</h3>
            <ul className={styles.ulGrid}>
              <RadioGroup
                name="sortBy"
                data={
                  saleTypeFilter === filters.AUCTION
                    ? sortBy.filter(
                        (item) =>
                          item.name !== filters.LOWEST_PRICE &&
                          item.name !== filters.HIGHEST_PRICE,
                      )
                    : sortBy.filter(
                        (item) =>
                          item.name !== filters.HIGHEST_BIDS &&
                          item.name !== filters.MOST_BIDS &&
                          item.name !== filters.ENDING_SOON,
                      )
                }
                control={control}
                handleChange={handleSortByChange}
              />
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

NftFilter.propTypes = {
  control: PropTypes.object,
  handleSaleTypeChange: PropTypes.func,
  handleSortByChange: PropTypes.func,
  saleTypeFilter: PropTypes.string,
};

export default NftFilter;
