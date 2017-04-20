import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

import CharacterAttribute from '../components/CharacterAttribute.jsx';

const CharacterAttrsSecondaries = ({
  stats,
  spec,
  comparedTo,
  comparedToSpec,
  hideLabels,
}) => {
  let versatilityKey;
  switch (spec.role) {
    case 'HEAL':
      versatilityKey = 'versatilityHealingDoneBonus';
    case 'TANK':
    case 'DPS':
    default:
      versatilityKey = 'versatilityDamageDoneBonus';
  }


  return (
    <div className={`CharacterAttributes ${hideLabels && 'CharacterAttributes--right'}`}>

      <CharacterAttribute
        label="Critical"
        value={stats.critRating}
        difference={compare({ base: stats, comparedTo, key: 'critRating' })}
        percentageValue={stats.crit}
        percentageDifference={compare({ base: stats, comparedTo, key: 'crit' })}
        hideLabels={hideLabels}
      />

      <CharacterAttribute
        label="Haste"
        value={stats.hasteRating}
        difference={compare({ base: stats, comparedTo, key: 'hasteRating' })}
        percentageValue={stats.haste}
        percentageDifference={compare({ base: stats, comparedTo, key: 'haste' })}
        hideLabels={hideLabels}
      />

      {/*
      <CharacterAttribute
        label="Leech"
        value={stats.leech}
        difference={compare({ base: stats, comparedTo, key: 'leech' })}
        hideLabels={hideLabels}
        isPercentage
      />
      */}

      <CharacterAttribute
        label="Mastery"
        value={stats.masteryRating}
        difference={compare({ base: stats, comparedTo, key: 'masteryRating' })}
        percentageValue={stats.mastery}
        percentageDifference={compare({ base: stats, comparedTo, key: 'mastery' })}
        hideLabels={hideLabels}
      />

      <CharacterAttribute
        label="Versatility"
        value={stats.versatility}
        difference={compare({ base: stats, comparedTo, key: 'versatility' })}
        percentageValue={stats[versatilityKey]}
        percentageDifference={compare({ base: stats, comparedTo, key: versatilityKey })}
        hideLabels={hideLabels}
      />

      {/*
      <CharacterAttribute
        label="Avoidance"
        value={stats.avoidanceRating}
        difference={compare({ base: stats, comparedTo, key: 'avoidanceRating' })}
        percentageValue={stats.avoidanceRatingBonus}
        percentageDifference={compare({ base: stats, comparedTo, key: 'avoidanceRatingBonus' })}
        hideLabels={hideLabels}
      />
      */}

      <CharacterAttribute
        label="Mana Regeneration"
        value={stats.mana5}
        difference={compare({ base: stats, comparedTo, key: 'mana5' })}
        hideLabels={hideLabels}
      />
    </div>
  );
};

CharacterAttrsSecondaries.propTypes = {
  stats: PropTypes.shape({
    crit: PropTypes.number.isRequired,
    critRating: PropTypes.number.isRequired,
    haste: PropTypes.number.isRequired,
    hasteRating: PropTypes.number.isRequired,
    mastery: PropTypes.number.isRequired,
    masteryRating: PropTypes.number.isRequired,
    mana5: PropTypes.number.isRequired,
  }).isRequired,
  spec: PropTypes.shape({
    role: PropTypes.string.isRequired
  }).isRequired,
  comparedTo: PropTypes.shape({
    crit: PropTypes.number.isRequired,
    critRating: PropTypes.number.isRequired,
    haste: PropTypes.number.isRequired,
    hasteRating: PropTypes.number.isRequired,
    mastery: PropTypes.number.isRequired,
    masteryRating: PropTypes.number.isRequired,
    mana5: PropTypes.number.isRequired,
  }),
  comparedToSpec: PropTypes.shape({
    role: PropTypes.string.isRequired
  }),
  hideLabels: PropTypes.bool,
};
CharacterAttrsSecondaries.defaultProps = {
  hideLabels: false,
};
CharacterAttrsSecondaries.displayName = 'CharacterAttrsSecondaries';

export default CharacterAttrsSecondaries;