import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

import CharacterAttribute from '../components/CharacterAttribute.jsx';

const CharacterAttrsMain = ({
  stats,
  comparedTo,
  hideLabels,
}) => (
  <div className={`CharacterAttributes ${hideLabels && 'CharacterAttributes--right'}`}>
    <CharacterAttribute
      label="Strength"
      value={stats.str}
      difference={compare({ base: stats, comparedTo, key: 'str' })}
      hideLabels={hideLabels}
    />
    
    <CharacterAttribute
      label="Agility"
      value={stats.agi}
      difference={compare({ base: stats, comparedTo, key: 'agi' })}
      hideLabels={hideLabels}
    />

    <CharacterAttribute
      label="Intelect"
      value={stats.int}
      difference={compare({ base: stats, comparedTo, key: 'int' })}
      hideLabels={hideLabels}
    />
    
    <CharacterAttribute
      label="Stamina"
      value={stats.sta}
      difference={compare({ base: stats, comparedTo, key: 'sta' })}
      hideLabels={hideLabels}
    />
  </div>
);

CharacterAttrsMain.propTypes = {
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
CharacterAttrsMain.defaultProps = {
  hideLabels: false,
};
CharacterAttrsMain.displayName = 'CharacterAttrsMain';

export default CharacterAttrsMain;