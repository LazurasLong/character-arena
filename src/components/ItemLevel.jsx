import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

const ItemLevel = ({
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
    <div className={`Attributes ${hideLabels && 'Attributes--right'}`}>

      {/* Average item level */}
      <div className="Attributes-item">
        {/* Show labels */}
        {!hideLabels &&
          <span className="Attributes-label">Average</span>
        }

        {/* Show values */}
        <span className="Attributes-value">{items.averageItemLevel}</span>

        {/* Show difference */}
        {averageIlvlDifference &&
          <span className={`Attributes-value Comparator-difference ${averageIlvlDifference > 0 ? 'Comparator--greater' : 'Comparator--lower'}`}>
            { averageIlvlDifference > 0 ? `+${averageIlvlDifference}` : averageIlvlDifference}
          </span>
        }
      </div>

      {/* Equipped item level */}
      <div className="Attributes-item">
        {/* Show labels */}
        {!hideLabels &&
          <span className="Attributes-label">Equipped</span>
        }

        {/* Show values */}
        <span className="Attributes-value">{items.averageItemLevelEquipped}</span>

        {/* Show difference */}
        {equippedIlvlDifference &&
          <span className={`Attributes-value Comparator-difference ${equippedIlvlDifference > 0 ? 'Comparator--greater' : 'Comparator--lower'}`}>
            { equippedIlvlDifference > 0 ? `+${equippedIlvlDifference}` : equippedIlvlDifference}
          </span>
        }
      </div>
    </div>
  );
};

ItemLevel.propTypes = {
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
ItemLevel.defaultProps = {
  hideLabels: false,
};
ItemLevel.displayName = 'ItemLevel';

export default ItemLevel;