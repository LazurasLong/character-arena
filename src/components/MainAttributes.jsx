import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

import Attribute from '../components/Attribute.jsx';

const MainAttributes = ({
  stats,
  comparedTo,
  hideLabels,
}) => (
  <div className={`Attributes ${hideLabels && 'Attributes--right'}`}>
    <Attribute
      label="Strength"
      value={stats.str}
      difference={compare({ base: stats, comparedTo, key: 'str' })}
      hideLabels={hideLabels}
    />
    
    <Attribute
      label="Agility"
      value={stats.agi}
      difference={compare({ base: stats, comparedTo, key: 'agi' })}
      hideLabels={hideLabels}
    />

    <Attribute
      label="Intelect"
      value={stats.int}
      difference={compare({ base: stats, comparedTo, key: 'int' })}
      hideLabels={hideLabels}
    />
    
    <Attribute
      label="Stamina"
      value={stats.sta}
      difference={compare({ base: stats, comparedTo, key: 'sta' })}
      hideLabels={hideLabels}
    />
  </div>
);

MainAttributes.propTypes = {
  stats: PropTypes.shape({
    str: PropTypes.number.isRequired,
    agi: PropTypes.number.isRequired,
    int: PropTypes.number.isRequired,
    sta: PropTypes.number.isRequired,
  }).isRequired,
  comparedTo: PropTypes.shape({
    str: PropTypes.number.isRequired,
    agi: PropTypes.number.isRequired,
    int: PropTypes.number.isRequired,
    sta: PropTypes.number.isRequired,
  }),
  hideLabels: PropTypes.bool,
};
MainAttributes.defaultProps = {
  hideLabels: false,
};
MainAttributes.displayName = 'MainAttributes';

export default MainAttributes;