import React, { PropTypes } from 'react';

const CharacterClass = ({
  characterClass,
  className,
}) => (
  <span className={`${className} color--${characterClass.slug}`}>
    {characterClass.name}
  </span>
);

CharacterClass.propTypes = {
  characterClass: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string,
};
CharacterClass.defaultProps = {
  className: '',
};
CharacterClass.displayName = 'CharacterClass';

export default CharacterClass;