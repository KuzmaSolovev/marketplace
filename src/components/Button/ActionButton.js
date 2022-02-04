import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Actionbutton.module.scss';

const ActionButton = ({
  id,
  label,
  className,
  handler,
  secondary,
  disabled,
  ...rest
}) => {
  const actionButtonStyles = clsx({
    [styles.button]: true,
    [className]: true,
    [styles.secondary]: secondary,
    [styles.disabled]: disabled,
  });

  return (
    <button
      id={id}
      className={actionButtonStyles}
      onClick={handler}
      disabled={disabled}
      {...rest}>
      {label}
    </button>
  );
};

ActionButton.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  handler: PropTypes.func,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ActionButton;
