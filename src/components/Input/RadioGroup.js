import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';

const RadioGroup = ({ data, name, control, handleChange }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return data.map((item) => (
          <li key={item.label}>
            <input
              id={item.name}
              type="radio"
              name={name}
              value={value || ''}
              checked={item.id === value}
              onChange={(e) => {
                onChange(parseInt(e.target.id));
                handleChange(item);
              }}
            />
            <label htmlFor={item.name}>{item.label}</label>
          </li>
        ));
      }}
    />
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  handleChange: PropTypes.func,
  control: PropTypes.object.isRequired,
};

export default RadioGroup;
