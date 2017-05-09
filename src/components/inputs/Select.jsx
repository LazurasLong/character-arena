import React, { PropTypes } from 'react';

import Error from '../../components/inputs/Error.jsx';

const Select = ({
  name,
  reference,
  options,
  placeholder,
  handleChange,
  value,
  required,
  error,
}) => (
  <label
    className={`Select ${error ? 'is-invalid' : ''}`}
  >
    <span className="Select-label">{placeholder}</span>
    <select
      name={name}
      className="Select-field"
      required={required}
      ref={reference}
      defaultValue={value}
      onChange={handleChange}
    >
      {options.map(opt => {
        return (
          <option
            value={opt.slug}
            key={opt.slug}
          >
            {opt.name} {opt.timezone ? `(${opt.timezone})` : ''}
          </option>
        );
      })}
    </select>
    {error &&
      <Error error={{data: error}} />
    }
  </label>
);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    timezone: PropTypes.string,
  })),
  reference: PropTypes.func,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.shape({
    valid: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  }),
};
Select.defaultProps = {
  options: [],
  name: '',
  reference: () => {},
  placeholder: '',
  handleChange: () => {},
  required: false,
};
Select.displayName = 'Select';

export default Select;
