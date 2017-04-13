import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

import Attribute from '../components/Attribute.jsx';

const DeffenseAttributes = ({
  stats,
  comparedTo,
  hideLabels,
}) => (
  <div className={`Attributes ${hideLabels && 'Attributes--right'}`}>

    <Attribute
      label="Armor"
      value={stats.armor}
      difference={compare({ base: stats, comparedTo, key: 'armor' })}
      hideLabels={hideLabels}
    />

    <Attribute
      label="Dodge"
      value={stats.dodgeRating}
      difference={compare({ base: stats, comparedTo, key: 'dodgeRating' })}
      percentageValue={stats.dodge}
      percentageDifference={compare({ base: stats, comparedTo, key: 'dodge' })}
      hideLabels={hideLabels}
    />

    <Attribute
      label="Parry"
      value={stats.parryRating}
      difference={compare({ base: stats, comparedTo, key: 'parryRating' })}
      percentageValue={stats.parry}
      percentageDifference={compare({ base: stats, comparedTo, key: 'parry' })}
      hideLabels={hideLabels}
    />

    <Attribute
      label="Block"
      value={stats.block}
      difference={compare({ base: stats, comparedTo, key: 'block' })}
      hideLabels={hideLabels}
    />
  </div>
);

DeffenseAttributes.propTypes = {
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
DeffenseAttributes.defaultProps = {
  hideLabels: false,
};
DeffenseAttributes.displayName = 'DeffenseAttributes';

export default DeffenseAttributes;