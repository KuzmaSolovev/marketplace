import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useWeb3State } from '@features/web3/context';
import useContractApproval from '@features/hooks/useContractApproval';

import RadioGroup from '@components/Input/RadioGroup';
import ActionButton from '@components/Button';
import Collapse from '@components/Collapse';

import { useRouter } from 'next/router';
import { queryClient } from '@api/base';
import {
  LAST_CREATED_AUCTIONS,
  LATEST_ASKS,
  OWNED_NFTS,
} from '@api/constants/queryKeys';
import useListItemAction from '@features/hooks/useListItemAction';

import { saleType } from '@shared/enums/explore';
import { AUCTION } from '@shared/constants/filters';
import config from '@config';

import styles from './AuctionForm.module.scss';

const defaultValues = {
  saleType: 1,
  price: null,
};

const AuctionForm = ({ tokenId, curator }) => {
  const { currentAddress } = useWeb3State();

  const { push } = useRouter();

  const [tokenSaleType, setTokenSaleType] = useState(AUCTION);

  const { control, register, setValue, handleSubmit } = useForm({
    defaultValues,
  });

  const [days, setDays] = useState('0');
  const [hours, setHours] = useState('0');

  const handleChange = (item) => {
    setValue('saleType', item.id);
    setTokenSaleType(item.name);
  };

  const { approveContract, isApproving } = useContractApproval();

  const onError = () => {
    toast.error('Transaction failed!');
  };

  const onSuccess = () => {
    queryClient.invalidateQueries([LAST_CREATED_AUCTIONS]);
    queryClient.invalidateQueries([LATEST_ASKS, currentAddress]);
    queryClient.invalidateQueries([OWNED_NFTS, currentAddress]);
    toast.success('Your item is listed!');
    if (saleType === 1) {
      push(`/accounts/${curator}?tab=auction`, undefined, { shallow: true });
    } else {
      push(`/accounts/${curator}?tab=on_sale`, undefined, { shallow: true });
    }
  };

  const { listItem, isListing } = useListItemAction(onSuccess, onError);

  const onSubmit = async (data) => {
    if (!data.price) {
      toast.error('Minimum price is required!');
      return;
    }

    const date = new Date();
    date.setDate(date.getDate() + +days);
    date.setHours(date.getHours() + +hours);
    const auctionEndTime = Date.parse(date);

    const tx = await approveContract({
      auctionContract: config.contracts.auctionFactory,
      tokenId,
    });

    if (tx && data.saleType === 1) {
      await listItem({
        type: 'auction',
        tokenId,
        auctionContract: config.contracts.auctionFactory,
        duration: auctionEndTime,
        price: data.price,
        curator,
        curatorFeePercantage: 0,
        currency: config.maticContractAddress,
      });
    } else {
      await listItem({
        type: 'buyNow',
        tokenId,
        price: data.price,
        currency: config.maticContractAddress,
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.listSelection}>
        <span>List item for Auction or Buy it now</span>
        <div className={styles.radioButtons}>
          <RadioGroup
            data={saleType}
            control={control}
            name="saleType"
            handleChange={handleChange}
          />
        </div>
      </div>
      {tokenSaleType === AUCTION ? (
        <div className={styles.auctionEndTime}>
          <div>
            <span>How long is your sale?</span>
          </div>
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
      ) : null}
      <div className={styles.pricing}>
        <span>{tokenSaleType === AUCTION ? 'Starting bid' : 'Buy Now '}</span>
        <div className={styles.inputWrapper}>
          <input
            type="number"
            placeholder="Enter your price here"
            name="price"
            min="0"
            step="any"
            {...register('price')}
          />{' '}
          <span>MATIC</span>
        </div>
        <ActionButton
          type="submit"
          label="List item"
          disabled={isListing || isApproving}
        />
      </div>
    </form>
  );
};

AuctionForm.propTypes = {
  tokenId: PropTypes.number,
  curator: PropTypes.string,
};

export default AuctionForm;
