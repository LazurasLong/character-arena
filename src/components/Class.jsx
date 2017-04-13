import React, { PropTypes } from 'react';

const Class = ({
  characterClass,
  className,
}) => (
  <span className={`${className} color--${characterClass.name.toLowerCase().replace(' ', '-')}`}>
    {characterClass.name}
  </span>
);

Class.propTypes = {
  characterClass: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string,
};
Class.defaultProps = {
  className: '',
};
Class.displayName = 'Class';

export default Class;