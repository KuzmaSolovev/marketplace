import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { Input, Textarea } from '@components/Form';
import ActionButton from '@components/Button';

import { useWeb3State } from '@features/web3/context';
import { queryClient } from '@api/base';
import userApi from '@api/user/user';

import types from '@shared/types/user';

import twitter from '@assets/icons/twitter-black.svg';
import instagram from '@assets/icons/instagram-black.svg';

import styles from './AccountEditForm.module.scss';

const defaultValues = {
  username: '',
  customUrl: '',
  bio: '',
  emailAddress: '',
  siteAddress: '',
  twitterUser: '',
  instagramUser: '',
  profileImage: '',
  profileBanner: '',
};

const AccountEditForm = ({ user, uploadedImageUrl }) => {
  const { currentAddress, signer } = useWeb3State();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
    setValue,
  } = useForm({ defaultValues, mode: 'onChange' });

  useEffect(() => {
    if (!!user) {
      reset({ ...defaultValues, ...user });
    }
  }, [user, reset]);

  useEffect(() => {
    if (!!uploadedImageUrl.profileImage) {
      setValue('profileImage', uploadedImageUrl.profileImage, {
        shouldDirty: true,
      });
    } else if (!!uploadedImageUrl.bannerImage) {
      setValue('profileBanner', uploadedImageUrl.bannerImage, {
        shouldDirty: true,
      });
    }
  }, [setValue, uploadedImageUrl.bannerImage, uploadedImageUrl.profileImage]);

  const onSubmit = async (data) => {
    data.profileImage = uploadedImageUrl.profileImage || null;
    data.profileBanner = uploadedImageUrl.bannerImage || null;

    const { profileImage, profileBanner, ...rest } = data;

    const profilePayload = {
      WalletAddress: currentAddress,
      Username: rest.username,
      CustomUrl: rest.customUrl,
      Bio: rest.bio,
      EmailAddress: rest.emailAddress,
      SiteAddress: rest.siteAddress,
      TwitterUser: rest.twitterUser,
      InstagramUser: rest.instagramUser,
      LastUpdated: new Date().toISOString(),
    };
    const stringifiedProfilePayload = JSON.stringify(profilePayload);

    const signature = await signer.signMessage(
      stringifiedProfilePayload,
      currentAddress,
    );

    const requestPayload = {
      walletAddress: currentAddress,
      profileImage,
      profileBanner,
      profilePayload: stringifiedProfilePayload,
      signature,
    };

    const formData = Object.entries(requestPayload).reduce((fd, [key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => fd.append(key, v));
      } else {
        fd.append(key, val);
      }
      return fd;
    }, new FormData());

    updateUserProfile.mutateAsync({
      formData,
    });
  };

  const updateUserProfile = useMutation(
    ({ formData }) => userApi.updateConnectedUserProfile(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', currentAddress]);
        toast.success('Your profile has been updated!');
      },
    },
  );

  return (
    <div className={styles.editForm}>
      <form autoComplete="true" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          name="username"
          label="Username *"
          type="text"
          placeholder="@"
          control={control}
          error={errors.username}
          validations={{
            pattern: {
              value: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/g,
              message: 'Wrong username format',
            },
          }}
        />
        <Input
          name="customUrl"
          label="Custom Url"
          type="url"
          placeholder="Enter your custom URL"
          control={control}
          error={errors.customUrl}
          validations={{
            pattern: {
              value:
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
              message: 'Wrong url format',
            },
          }}
        />
        <Textarea
          name="bio"
          label="Bio"
          type="text"
          placeholder="Tell the world who you are"
          validations={{
            maxLength: {
              value: 500,
              message: 'Message is to long',
            },
          }}
          control={control}
          error={errors.bio}
        />
        <Input
          name="emailAddress"
          label="Email address *"
          type="email"
          placeholder="Enter e-mail"
          validations={{
            maxLength: {
              value: 256,
              message: 'Email is to long',
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Wrong email format',
            },
          }}
          control={control}
          error={errors.emailAddress}
        />
        <Input
          name="siteAddress"
          label="Your site"
          type="url"
          placeholder="Enter website URL"
          control={control}
          error={errors.siteAddress}
          validations={{
            pattern: {
              value:
                /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
              message: 'Wrong URL format',
            },
          }}
        />
        <Input
          name="twitterUser"
          label="Twitter username"
          type="text"
          placeholder="Enter Twitter username"
          control={control}
          error={errors.twitterUser}
          validations={{
            pattern: {
              value: /(^|[^@\w])@(\w{1,15})\b/g,
              message: 'Wrong twitter username format',
            },
          }}
          icon={twitter}
        />
        <Input
          name="instagramUser"
          label="Instagram username"
          type="text"
          placeholder="Instagram username"
          control={control}
          error={errors.instagramUser}
          validations={{
            pattern: {
              value:
                /([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g,
              message: 'Wrong instagram username format',
            },
          }}
          icon={instagram}
        />
        <ActionButton
          className={styles.btnForm}
          label="Update Profile"
          type="submit"
          disabled={!isDirty || !!Object.keys(errors).length}
        />
      </form>
    </div>
  );
};

AccountEditForm.propTypes = {
  user: PropTypes.oneOfType([types.UserAccount, PropTypes.string]),
  uploadedImageUrl: PropTypes.object,
};

export default AccountEditForm;
