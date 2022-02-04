import PropTypes from 'prop-types';

import { useState, useRef, useEffect } from 'react';

import Image from '@components/Image';

import copy from '@assets/icons/copy.svg';

import styles from './AccountAddress.module.scss';

const KEEP_COPIED_MS = 2000;

const getTruncatedAddress = (text, textWidth, availableWidth) => {
  if (availableWidth >= textWidth) {
    return text;
  } else {
    const charWidth = Math.ceil(textWidth / text.length);
    const maxChars = Math.floor(availableWidth / charWidth);
    var f = text.substring(0, maxChars - 7);
    var s = text.substring(text.length - 4, text.length);
    return f + '...' + s;
  }
};

const AccountAddress = ({ address }) => {
  const [displayCopied, setDisplayCopied] = useState(false);

  const handleClick = async () => {
    setDisplayCopied(true);
    navigator.clipboard.writeText(address);
    setTimeout(() => {
      setDisplayCopied(false);
    }, KEEP_COPIED_MS);
  };

  const shownRef = useRef(null);
  const hiddenRef = useRef(null);
  const [truncated, setTruncated] = useState();

  useEffect(() => {
    if (hiddenRef.current) {
      const observer = new ResizeObserver(() => {
        const hiddenWidth = hiddenRef.current?.offsetWidth;
        const shownWidth = shownRef.current?.offsetWidth;
        setTruncated(getTruncatedAddress(address, hiddenWidth, shownWidth));
      });
      observer.observe(shownRef.current);
      observer.observe(hiddenRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [address]);

  return (
    <div onClick={handleClick} className={styles.addressWrapper}>
      {!displayCopied ? (
        <>
          <div ref={shownRef} className={styles.addressStyles}>
            <div className={styles.addressFlex}>
              <span className={styles.addressSpan} variant={'body2'}>
                {truncated}
              </span>

              <div className={styles.copyIcon}>
                <Image defaultSrc={copy.src} width={'12px'} height={'12px'} />
              </div>
            </div>
          </div>
          <div className={styles.hiddenAddressWrapper}>
            <div ref={hiddenRef} className={styles.addressHidden}>
              {address}
            </div>
          </div>
        </>
      ) : (
        <div ref={shownRef} className={styles.addressCopiedWrapper}>
          <span className={styles.addressCopiedSpan} variant={'body2'}>
            {'Copied!'}
          </span>
        </div>
      )}
    </div>
  );
};

AccountAddress.propTypes = {
  address: PropTypes.string,
};

export default AccountAddress;
