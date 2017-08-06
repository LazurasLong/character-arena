import React from 'react';
import PropTypes from 'prop-types';

import Error from '../../components/inputs/Error.jsx';

const Input = ({
  type,
  name,
  reference,
  placeholder,
  required,
  error,
}) => (
  <label
    className={`Input ${error ? 'is-invalid' : ''}`}
  >
    <span className="Input-label">{placeholder}</span>
    <input
      className="Input-field"
      type={type}
      required={required}
      ref={reference}
    />
    {error &&
      <Error error={{data: error}} />
    }
  </label>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  reference: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.shape({
    valid: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  }),
};
Input.defaultProps = {
  type: 'text',
  name: '',
  reference: () => {},
  placeholder: '',
  required: false,
};
Input.displayName = 'Input';

export default Input;