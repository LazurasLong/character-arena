import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

import CharacterAttribute from '../components/CharacterAttribute.jsx';

const CharacterAttrsItems = ({
  items,
  comparedTo,
  hideLabels,
}) => {

  let averageIlvlDifference, equippedIlvlDifference;

  if (comparedTo && comparedTo.averageItemLevel) {
    averageIlvlDifference = compare({ base: items, comparedTo, key: 'averageItemLevel' });
  }

  if (comparedTo && comparedTo.averageItemLevelEquipped) {
    equippedIlvlDifference = compare({ base: items, comparedTo, key: 'averageItemLevelEquipped' });
  }

  return (
    <div className={`CharacterAttributes ${hideLabels && 'CharacterAttributes--right'}`}>

      {/* Average item level */}
      <CharacterAttribute
        label="Average"
        value={items.averageItemLevel}
        difference={compare({ base: items, comparedTo, key: 'averageItemLevel' })}
        hideLabels={hideLabels}
      />

      {/* Equipped item level */}
      <CharacterAttribute
        label="Equipped"
        value={items.averageItemLevelEquipped}
        difference={compare({ base: items, comparedTo, key: 'averageItemLevelEquipped' })}
        hideLabels={hideLabels}
      />
    </div>
  );
};

CharacterAttrsItems.propTypes = {
  items: PropTypes.shape({
    averageItemLevel: PropTypes.number.isRequired,
    averageItemLevelEquipped: PropTypes.number.isRequired
  }).isRequired,
  comparedTo: PropTypes.shape({
    averageItemLevel: PropTypes.number.isRequired,
    averageItemLevelEquipped: PropTypes.number.isRequired
  }),
  hideLabels: PropTypes.bool,
};
CharacterAttrsItems.defaultProps = {
  hideLabels: false,
};
CharacterAttrsItems.displayName = 'CharacterAttrsItems';

export default CharacterAttrsItems;