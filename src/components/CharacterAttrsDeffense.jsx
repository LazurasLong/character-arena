import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

import CharacterAttribute from '../components/CharacterAttribute.jsx';

const CharacterAttrsDeffense = ({
  stats,
  comparedTo,
  hideLabels,
}) => (
  <div className={`CharacterAttributes ${hideLabels && 'CharacterAttributes--right'}`}>

    <CharacterAttribute
      label="Armor"
      value={stats.armor}
      difference={compare({ base: stats, comparedTo, key: 'armor' })}
      hideLabels={hideLabels}
    />

    <CharacterAttribute
      label="Dodge"
      value={stats.dodgeRating}
      difference={compare({ base: stats, comparedTo, key: 'dodgeRating' })}
      percentageValue={stats.dodge}
      percentageDifference={compare({ base: stats, comparedTo, key: 'dodge' })}
      hideLabels={hideLabels}
    />

    <CharacterAttribute
      label="Parry"
      value={stats.parryRating}
      difference={compare({ base: stats, comparedTo, key: 'parryRating' })}
      percentageValue={stats.parry}
      percentageDifference={compare({ base: stats, comparedTo, key: 'parry' })}
      hideLabels={hideLabels}
    />

    <CharacterAttribute
      label="Block"
      value={stats.block}
      difference={compare({ base: stats, comparedTo, key: 'block' })}
      hideLabels={hideLabels}
    />
  </div>
);

CharacterAttrsDeffense.propTypes = {
  stats: PropTypes.shape({
    armor: PropTypes.number.isRequired,
    dodge: PropTypes.number.isRequired,
    dodgeRating: PropTypes.number.isRequired,
    parry: PropTypes.number.isRequired,
    parryRating: PropTypes.number.isRequired,
    block: PropTypes.number.isRequired,
    blockRating: PropTypes.number.isRequired,
  }).isRequired,
  comparedTo: PropTypes.shape({
    armor: PropTypes.number.isRequired,
    dodge: PropTypes.number.isRequired,
    dodgeRating: PropTypes.number.isRequired,
    parry: PropTypes.number.isRequired,
    parryRating: PropTypes.number.isRequired,
    block: PropTypes.number.isRequired,
    blockRating: PropTypes.number.isRequired,
  }),
  hideLabels: PropTypes.bool,
};
CharacterAttrsDeffense.defaultProps = {
  hideLabels: false,
};
CharacterAttrsDeffense.displayName = 'CharacterAttrsDeffense';

export default CharacterAttrsDeffense;