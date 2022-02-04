import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';

import Image from '@components/Image';

import styles from './Common.module.scss';

const Input = ({
  label,
  name,
  type,
  validations,
  control,
  error,
  onInputChange,
  placeholder,
  ...rest
}) => {
  return (
    <div className={`${styles.fieldset} ${!error ? '' : styles.error}`}>
      <div className={styles.labelWrapper}>
        <Image defaultSrc={rest.icon?.src} width={'16'} height={'16'} />
        <label htmlFor={name}>{label}</label>
      </div>
      <Controller
        name={name}
        rules={{ ...validations }}
        control={control}
        render={({ field: { onChange, value, name, ref } }) => (
          <input
            id={name}
            name={name}
            ref={ref}
            defaultValue={value}
            placeholder={placeholder}
            type={type}
            onChange={(e) => {
              onChange(e);
              onInputChange && onInputChange(e.target.value);
            }}
            {...rest}
          />
        )}
      />
      {error && <span style={{ color: 'red' }}>{error.message}</span>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validations: PropTypes.object,
  error: PropTypes.object,
  onCheckBoxChange: PropTypes.func,
  control: PropTypes.object.isRequired,
  onInputChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  validations: {},
  placeholder: '',
};

export default Input;
