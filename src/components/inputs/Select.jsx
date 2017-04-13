import React, { PropTypes } from 'react';

const Select = ({
  options,
  placeholder,
  reference,
  required,
}) => (
  <select
    className="Select"
    required={required}
    ref={reference}
    defaultValue=""
  >
    {placeholder.length &&
      <option>{placeholder}</option>
    }
    {options.map(opt => {
      return (
        <option
          value={opt.slug}
          key={opt.slug}
        >
          {opt.name} ({opt.timezone})
        </option>
      );
    })}
  </select>
);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
  })).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  reference: PropTypes.func,
};
Select.defaultProps = {
  placeholder: '',
  required: false,
  reference: () => {},
};
Select.displayName = 'Select';

export default Select;