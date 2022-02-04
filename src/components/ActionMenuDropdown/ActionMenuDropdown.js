import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useState, useRef } from 'react';

import { useWeb3State } from '@features/web3/context';

import Image from '@components/Image';
import ActionEditModal from '@components/ActionEditModal';
import ActionCancelModal from '@components/ActionCancelModal';
import useOutsideClick from '@shared/hooks/useOutsideClick';

import useLatestAuctionBids from '@api/auction/useLatestAuctionBids';

import menu from '@assets/icons/menu-dots.svg';
import edit from '@assets/icons/edit.svg';
import cancel from '@assets/icons/cancel.svg';

import styles from './ActionMenuDropdown.module.scss';

const ACTION_MENU = {
  EDIT: 'edit',
  CANCEL: 'cancel',
};

const ActionMenuDropdown = ({ auctionStatus, img, nftName, className }) => {
  const { currentAddress } = useWeb3State();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const closeRef = useRef();
  const actionMenuStyle = clsx({
    [styles.wrapper]: true,
    [className]: !!className,
  });

  const select = (data) => data[0];

  const { data: bids } = useLatestAuctionBids(
    {
      auctionId: auctionStatus?.auctionId,
    },
    !!auctionStatus?.auctionId,
    select,
  );

  useOutsideClick(closeRef, () => {
    setOpenMenu(false);
  });

  if (bids || currentAddress !== auctionStatus?.curator) return null;

  return (
    <>
      <div ref={closeRef} className={actionMenuStyle}>
        <div
          className={`${styles.dropdown} ${
            openMenu ? styles.dropdownOpen : ''
          }`}
          onClick={() => setOpenMenu((prev) => !prev)}>
          <Image
            className={styles.dropdownImage}
            defaultSrc={menu.src}
            width="17"
            height="4"
          />
        </div>
        <div
          className={clsx(
            `${styles.dropdownContent}  ${
              openMenu && styles.dropdownContentOpen
            }`,
          )}>
          <ul>
            <li
              className={styles.listItem}
              onClick={() => setSelectedAction(ACTION_MENU.EDIT)}>
              <Image defaultSrc={edit.src} width="16" height="16" />
              Edit
            </li>
            <li
              className={styles.listItem}
              onClick={() => setSelectedAction(ACTION_MENU.CANCEL)}>
              <Image defaultSrc={cancel.src} width="16" height="16" />
              Cancel
            </li>
          </ul>
        </div>
      </div>
      {selectedAction === ACTION_MENU.EDIT ? (
        <ActionEditModal
          auctionStatus={auctionStatus}
          img={img}
          nftName={nftName}
          setSelectedAction={setSelectedAction}
        />
      ) : null}
      {selectedAction === ACTION_MENU.CANCEL ? (
        <ActionCancelModal
          img={img}
          nftName={nftName}
          setSelectedAction={setSelectedAction}
        />
      ) : null}
    </>
  );
};

ActionMenuDropdown.propTypes = {
  className: PropTypes.string,
  auctionStatus: PropTypes.shape({
    auctionId: PropTypes.any,
    curator: PropTypes.string,
    reservePrice: PropTypes.number,
    auctionCurrency: PropTypes.string,
    endDateTime: PropTypes.string,
  }),
  img: PropTypes.string,
  nftName: PropTypes.string,
};

export default ActionMenuDropdown;
