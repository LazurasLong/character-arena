import React, { PropTypes } from 'react';

const Input = ({
  type,
  placeholder,
  required,
  reference,
}) => (
  <input
    type={type}
    label={placeholder}
    placeholder={placeholder}
    required={required}
    ref={reference}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  reference: PropTypes.func,
};
Input.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
  reference: () => {},
};
Input.displayName = 'Input';

export default Input;