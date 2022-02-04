import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

import Image from '@components/Image';

import types from '@shared/types/user';

import userAvatar from '@assets/images/user-avatar.jpg';
import constructImageQuery from '@shared/utils/constructImageQuery';

import styles from './AccountImageEditor.module.scss';

const AccountImageEditor = ({ user, onImageUpload }) => {
  const fileImgRef = useRef();
  const fileBannerRef = useRef();
  const [imgSrc, setImgSrc] = useState();
  const [bannerSrc, setBannerSrc] = useState();

  useEffect(() => {
    setImgSrc(
      imgSrc || constructImageQuery(user.profileImage) || userAvatar.src,
    );
    setBannerSrc(
      bannerSrc || constructImageQuery(user.profileBanner) || userAvatar.src,
    );
  }, [user, imgSrc, bannerSrc]);

  const handleImageSubmit = async () => {
    const fileToUpload = fileImgRef.current?.files?.[0];

    if (!fileToUpload) return;

    setImgSrc(URL.createObjectURL(fileToUpload));
    onImageUpload((prevState) => ({
      ...prevState,
      profileImage: fileToUpload,
    }));
  };

  const handleBannerSubmit = async () => {
    const fileToUpload = fileBannerRef.current?.files?.[0];

    if (!fileToUpload) return;

    setBannerSrc(URL.createObjectURL(fileToUpload));

    onImageUpload((prevState) => ({
      ...prevState,
      bannerImage: fileToUpload,
    }));
  };
  return (
    <div className={styles.editorContainer}>
      <div className={styles.imageEditor}>
        <span className={styles.imageTitle}>Profile image</span>
        <Image
          className={styles.imageWrapper}
          defaultSrc={imgSrc}
          width={'96'}
          height={'96'}
        />
        <input
          accept="image/*"
          onChange={handleImageSubmit}
          hidden
          ref={fileImgRef}
          id="icon-button-fileImage"
          type="file"
        />
        <label htmlFor="icon-button-fileImage">
          <span className={styles.btnUpload} aria-label="upload picture">
            Upload image
          </span>
        </label>
      </div>
      <div className={styles.imageEditor}>
        <span className={styles.imageTitle}>Profile banner</span>
        <Image
          className={styles.bannerWrapper}
          defaultSrc={bannerSrc}
          width={'200'}
          height={'124'}
        />
        <input
          accept="image/*"
          onChange={handleBannerSubmit}
          hidden
          ref={fileBannerRef}
          id="icon-button-fileBanner"
          type="file"
        />
        <label htmlFor="icon-button-fileBanner">
          <span className={styles.btnUpload} aria-label="upload picture">
            Upload image
          </span>
        </label>
      </div>
    </div>
  );
};

AccountImageEditor.propTypes = {
  user: PropTypes.oneOfType([types.UserAccount, PropTypes.string]),
  uploadedImageUrl: PropTypes.shape({
    profileImage: PropTypes.string,
    bannerImage: PropTypes.string,
  }),
  onImageUpload: PropTypes.func,
};

export default AccountImageEditor;
