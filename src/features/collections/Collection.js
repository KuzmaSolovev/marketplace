import PropTypes from 'prop-types';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import NftSimpleAuctionCards from '@components/NftSimpleAuctionCards';
import Arrow from '@components/Arrow';

import 'swiper/css';

import styles from './Collection.module.scss';

SwiperCore.use([Navigation]);

const Collection = ({ collection, arrow }) => {
  const sliderRef = useRef(null);

  return (
    <div className={styles.container}>
      <div id={`${arrow}-prev`} className={styles.arrow}>
        <Arrow size="Large" direction="Left" />
      </div>
      <Swiper
        itemRef={sliderRef}
        key={collection?.length || 1}
        className={styles.swiperContainer}
        slidesPerView="auto"
        initialSlide={Math.floor(collection.length / 2)}
        spaceBetween={24}
        updateOnWindowResize
        speed={800}
        breakpoints={{
          300: {
            slidesPerView: 'auto',
            centeredSlides: true,
          },
          768: {
            slidesPerView: 'auto',
            centeredSlides: true,
          },
          1028: {
            slidesPerView: 4,
            centeredSlides: false,
          },
        }}
        centeredSlides
        draggable
        navigation={{
          nextEl: `#${arrow}-next`,
          prevEl: `#${arrow}-prev`,
        }}>
        {collection && collection.length !== 0
          ? collection.map((item) => (
              <SwiperSlide key={item.tokenId}>
                <NftSimpleAuctionCards item={item} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
      <div id={`${arrow}-next`} className={styles.arrow}>
        <Arrow size="Large" direction="Right" />
      </div>
    </div>
  );
};

Collection.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.shape({})),
  arrow: PropTypes.string,
};

export default Collection;
