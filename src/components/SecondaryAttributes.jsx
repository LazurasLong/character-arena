import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

import Attribute from '../components/Attribute.jsx';

const SecondaryAttributes = ({
  stats,
  comparedTo,
  hideLabels,
}) => (
  <div className={`Attributes ${hideLabels && 'Attributes--right'}`}>

    <Attribute
      label="Critical"
      value={stats.critRating}
      difference={compare({ base: stats, comparedTo, key: 'critRating' })}
      percentageValue={stats.crit}
      percentageDifference={compare({ base: stats, comparedTo, key: 'crit' })}
      hideLabels={hideLabels}
    />

    <Attribute
      label="Haste"
      value={stats.hasteRating}
      difference={compare({ base: stats, comparedTo, key: 'hasteRating' })}
      percentageValue={stats.haste}
      percentageDifference={compare({ base: stats, comparedTo, key: 'haste' })}
      hideLabels={hideLabels}
    />

    {/*
    <Attribute
      label="Leech"
      value={stats.leech}
      difference={compare({ base: stats, comparedTo, key: 'leech' })}
      hideLabels={hideLabels}
      isPercentage
    />
    */}

    <Attribute
      label="Mastery"
      value={stats.masteryRating}
      difference={compare({ base: stats, comparedTo, key: 'masteryRating' })}
      percentageValue={stats.mastery}
      percentageDifference={compare({ base: stats, comparedTo, key: 'mastery' })}
      hideLabels={hideLabels}
    />

    {/*
    <Attribute
      label="Avoidance"
      value={stats.avoidanceRating}
      difference={compare({ base: stats, comparedTo, key: 'avoidanceRating' })}
      percentageValue={stats.avoidanceRatingBonus}
      percentageDifference={compare({ base: stats, comparedTo, key: 'avoidanceRatingBonus' })}
      hideLabels={hideLabels}
    />
    */}

    <Attribute
      label="Mana Regeneration"
      value={stats.mana5}
      difference={compare({ base: stats, comparedTo, key: 'mana5' })}
      hideLabels={hideLabels}
    />
  </div>
);

SecondaryAttributes.propTypes = {
  stats: PropTypes.shape({
    crit: PropTypes.number.isRequired,
    critRating: PropTypes.number.isRequired,
    haste: PropTypes.number.isRequired,
    hasteRating: PropTypes.number.isRequired,
    mastery: PropTypes.number.isRequired,
    masteryRating: PropTypes.number.isRequired,
    mana5: PropTypes.number.isRequired,
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
  hideLabels: PropTypes.bool,
};
SecondaryAttributes.defaultProps = {
  hideLabels: false,
};
SecondaryAttributes.displayName = 'SecondaryAttributes';

export default SecondaryAttributes;