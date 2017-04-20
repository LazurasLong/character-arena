import React, { PropTypes } from 'react';

const Input = ({
  type,
  placeholder,
  required,
  reference,
}) => (
  <label
    className="Input"
  >
    <span className="Input-label">{placeholder}</span>
    <input
      className="Input-field"
      type={type}
      required={required}
      ref={reference}
    />
  </label>
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