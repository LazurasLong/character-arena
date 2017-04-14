import React, { PropTypes } from 'react';

import SpecIcon from '../components/SpecIcon.jsx';

const Specialization = ({
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
      <SpecIcon icon={spec.icon} />
      <span className="Character-specName">{spec.name}</span>
    </span>
  );
};

Specialization.propTypes = {
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
Specialization.defaultProps = {
  className: '',
};
Specialization.displayName = 'Specialization';

export default Specialization;