import React, { PropTypes } from 'react';

const CustomCheckbox = ({
  label,
  selected = false,
  handleClick,
}) => (
  <label className="CustomCheckbox">
    <input
      className="CustomCheckbox-input"
      type="checkbox"
      onClick={() => { handleClick({ label, selected }); }}
    />
    <span className="CustomCheckbox-label">{label}</span>
  </label>
);

CustomCheckbox.displayName = 'CustomCheckbox';

export default CustomCheckbox;