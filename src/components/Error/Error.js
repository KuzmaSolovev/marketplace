import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import ActionButton from '@components/Button';
import Image from '@components/Image';

import kitsumonLogo from '@assets/images/kitsumon-logo-big.png';
import backgroundSky from '@assets/images/background-sky.png';
import grass from '@assets/images/grass.png';
import kitsune from '@assets/images/kitsune.png';
import nuclismo from '@assets/images/nuclismo.png';
import pharaoha from '@assets/images/pharaoha.png';
import backgroundNight from '@assets/images/background-night.png';
import moon from '@assets/images/moon.png';

import styles from './Error.module.scss';

const Error = ({ title, description }) => {
  const Router = useRouter();
  const time = new Date().getHours();
  const [backgroundImg, setBackgroundImg] = useState({
    sky: null,
    moon: null,
  });

  useEffect(() => {
    if (time > 17 || time < 6)
      setBackgroundImg({ sky: backgroundNight.src, moon: moon.src });
    else setBackgroundImg({ sky: backgroundSky.src });
  }, [time]);

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url(${backgroundImg.sky})`,
      }}>
      <div className={styles.container}>
        <div className={styles.moon}>
          <Image defaultSrc={backgroundImg.moon} width="100%" />
        </div>
        <Image
          className={styles.logo}
          defaultSrc={kitsumonLogo.src}
          width="411px"
          height="120px"
        />
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        <ActionButton
          className={styles.button}
          label="Go to the homepage"
          onClick={() => Router.push('/')}
        />
      </div>
      <Image
        className={styles.grassImage}
        defaultSrc={grass.src}
        width="100%"
      />
      <div className={styles.kitsumonsWrapper}>
        <Image defaultSrc={nuclismo.src} width="288px" height="254px" />
        <Image defaultSrc={kitsune.src} width="296px" height="245px" />
        <Image defaultSrc={pharaoha.src} width="250px" height="254px" />
      </div>
    </div>
  );
};

Error.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Error;
