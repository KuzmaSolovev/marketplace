import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ActionButton from '@components/Button';
import Image from '@components/Image';
import Collapse from '@components/Collapse';

import utils from '@shared/utils/utils';

import styles from './ActionEditModal.module.scss';

const defaultValues = {
  price: null,
};

const ActionEditModal = ({
  auctionStatus,
  img,
  nftName,
  setSelectedAction,
}) => {
  const { auctionId, reservePrice } = auctionStatus;
  const [days, setDays] = useState('0');
  const [hours, setHours] = useState('0');
  const title = auctionId ? 'Edit auction listing' : 'Edit buy now listing';

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    if (!data.price) {
      toast.error('Minimum bid price is required!');
      return;
    }

    const date = new Date();
    date.setDate(date.getDate() + +days);
    date.setHours(date.getHours() + +hours);
    const auctionEndTime = Date.parse(date);

    console.log(data, auctionEndTime);
  };

  return (
    <div className="overlay">
      <div className={clsx('container', styles.container)}>
        <h3 className="containerTitle">{title}</h3>
        <div>
          <Image
            className={styles.imgWrapper}
            defaultSrc={img}
            width="158"
            height="158"
          />
          <h3>{nftName}</h3>
        </div>
        <div className={styles.priceWrapper}>
          <span className={styles.title}>Reserved price</span>
          <span className={styles.price}>
            {utils.fromWei(reservePrice.toString())}
          </span>
        </div>
        <form className={styles.actionForm} onSubmit={handleSubmit(onSubmit)}>
          {auctionId && (
            <div className={styles.auctionWrapper}>
              <span className={styles.title}>Duration</span>
              <div className={styles.auctionEndTimeList}>
                <div className={styles.selectList}>
                  <Collapse items={33} current={days} setCurrent={setDays} />
                  <span className={styles.selectListSpan}>:days</span>
                </div>
                <div className={styles.selectList}>
                  <Collapse items={24} current={hours} setCurrent={setHours} />
                  <span className={styles.selectListSpan}>:hours</span>
                </div>
              </div>
            </div>
          )}
          <div className={styles.auctionWrapper}>
            <span className={styles.title}>New price</span>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                placeholder="Enter price here"
                required
                name="price"
                min="0"
                step="any"
                {...register('price')}
              />
              <span>MATIC</span>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <ActionButton
              className={styles.cancelButton}
              label="Cancel"
              onClick={() => setSelectedAction('')}
            />
            <ActionButton type="submit" label="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

ActionEditModal.propTypes = {
  auctionStatus: PropTypes.any,
  img: PropTypes.string,
  nftName: PropTypes.string,
  setSelectedAction: PropTypes.func,
};

export default ActionEditModal;
