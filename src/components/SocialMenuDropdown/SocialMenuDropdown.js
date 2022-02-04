import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Passers } from 'prop-passer';
import {
  RedditShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditIcon,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  TelegramIcon,
} from 'react-share';

import { useState, useRef } from 'react';

import Image from '@components/Image';
import useOutsideClick from '@shared/hooks/useOutsideClick';

import share from '@assets/icons/vector.svg';

import styles from './SocialMenuDropdown.module.scss';

const SocialMenuDropdown = ({ className }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const closeRef = useRef();
  const actionMenuStyle = clsx({
    [styles.wrapper]: true,
    [className]: !!className,
  });

  useOutsideClick(closeRef, () => {
    setOpenMenu(false);
  });

  const url = String(window.location);

  const ShareList = Passers({
    url,
    className: 'network__share-button',
  })({
    className: 'network cursor-pointer hover transition--default',
    title: `Share ${String(window.location)}`,
  })('li');

  return (
    <div ref={closeRef} className={actionMenuStyle}>
      <div
        className={`${styles.dropdown} ${openMenu ? styles.dropdownOpen : ''}`}
        onClick={() => setOpenMenu((prev) => !prev)}>
        <Image
          altText="Avatar image"
          className="mobile-hide"
          defaultSrc={share.src}
          width="16"
          height="16"
        />
      </div>

      <div
        className={clsx(
          `${styles.dropdownContent}  ${
            openMenu && styles.dropdownContentOpen
          }`,
        )}>
        <ul>
          <ShareList>
            <RedditShareButton>
              <li
                className={styles.listItem}
                style={{ display: 'flex', gap: '8px' }}>
                <RedditIcon
                  style={{ display: 'block' }}
                  size={20}
                  round={true}
                />
                Discord
              </li>
            </RedditShareButton>
            <FacebookShareButton>
              <li
                className={styles.listItem}
                style={{ display: 'flex', gap: '8px' }}>
                <FacebookIcon
                  style={{ display: 'block' }}
                  size={20}
                  round={true}
                />
                Facebook
              </li>
            </FacebookShareButton>
            <WhatsappShareButton>
              <li
                className={styles.listItem}
                style={{ display: 'flex', gap: '8px' }}>
                <WhatsappIcon
                  style={{ display: 'block' }}
                  size={20}
                  round={true}
                />
                Whatsapp
              </li>
            </WhatsappShareButton>
            <TwitterShareButton>
              <li
                className={styles.listItem}
                style={{ display: 'flex', gap: '8px' }}>
                <TwitterIcon
                  style={{ display: 'block' }}
                  size={20}
                  round={true}
                />
                Twitter
              </li>
            </TwitterShareButton>
            <TelegramShareButton>
              <li
                className={styles.listItem}
                style={{ display: 'flex', gap: '8px' }}>
                <TelegramIcon
                  style={{ display: 'block' }}
                  size={20}
                  round={true}
                />
                Telegram
              </li>
            </TelegramShareButton>
          </ShareList>
        </ul>
      </div>
    </div>
  );
};

SocialMenuDropdown.propTypes = {
  className: PropTypes.string,
};

export default SocialMenuDropdown;
