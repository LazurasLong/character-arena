import React from 'react';
import PropTypes from 'prop-types';

import CharacterSpecIcon from '../components/CharacterSpecIcon.jsx';

const CharacterSpec = ({
  className,
  level,
  characterClass,
  spec,
  shouldCompare,
  isDifferentSpec,
}) => (
  <span className={`Specialization ${className} ${shouldCompare && !isDifferentSpec ? 'is-equal' : ''} ${shouldCompare && isDifferentSpec ? 'is-different' : ''}`}>
    {/*<CharacterSpecIcon icon={spec.icon} />*/}
    <span className="Character-specName">{level} {characterClass.name} {spec.name}</span>
  </span>
);

CharacterSpec.propTypes = {
  className: PropTypes.string,
  level: PropTypes.number.isRequired,
  characterClass: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  spec: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
  }),
  comparedTo: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
  }),
};
CharacterSpec.defaultProps = {
  className: '',
};
CharacterSpec.displayName = 'CharacterSpec';

export default CharacterSpec;