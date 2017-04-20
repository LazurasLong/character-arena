import React, { PropTypes } from 'react';

const Select = ({
  options,
  placeholder,
  reference,
  required,
  handleChange,
  value
}) => (
  <label className="Select">
    <span className="Select-label">{placeholder}</span>
    <select
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
  </label>
);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    timezone: PropTypes.string,
  })),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  reference: PropTypes.func,
  handleChange: PropTypes.func,
};
Select.defaultProps = {
  options: [],
  placeholder: '',
  required: false,
  reference: () => {},
  handleChange: () => {},
};
Select.displayName = 'Select';

export default Select;
