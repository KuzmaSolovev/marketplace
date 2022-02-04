import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';

import styles from './Common.module.scss';

const Textarea = ({
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
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        rules={{ ...validations }}
        control={control}
        render={({ field: { onChange, value, name, ref } }) => (
          <textarea
            id={name}
            name={name}
            ref={ref}
            defaultValue={value}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              onChange(e);
              onInputChange && onInputChange(e.target.value);
            }}
            rows="1"
            {...rest}
          />
        )}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validations: PropTypes.object,
  error: PropTypes.object,
  control: PropTypes.object.isRequired,
  onInputChange: PropTypes.func,
};

Textarea.defaultProps = {
  type: 'text',
  validations: {},
  placeholder: '',
};

export default Textarea;
