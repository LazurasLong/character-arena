import React, { PropTypes } from 'react';

import CharacterSpecIcon from '../components/CharacterSpecIcon.jsx';

const CharacterSpec = ({
  className,
  spec,
  comparedTo,
}) => {

  const isCompared = (comparedTo && spec.backgroundImage && comparedTo.backgroundImage);
  const isEqual = (isCompared && spec && spec.backgroundImage && spec.backgroundImage === comparedTo.backgroundImage);

  let differentClassName = '';
  if (isCompared) {
    if (isEqual) differentClassName = 'is-equal';
    else differentClassName = 'is-different';
  }

  return (
    <span className={`Specialization ${className} ${differentClassName}`}>
      <CharacterSpecIcon icon={spec.icon} />
      <span className="Character-specName">{spec.name}</span>
    </span>
  );
};

CharacterSpec.propTypes = {
  className: PropTypes.string,
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