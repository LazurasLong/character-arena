import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

import CharacterAttribute from '../components/CharacterAttribute.jsx';

const CharacterAttributesGroup = ({
  elements,
  data,
  comparedTo,
  hideLabels,
}) => (
  <div className={`CharacterAttributes ${hideLabels && 'CharacterAttributes--right'}`}>

    {/* Loop through each attribute */}
    {elements.map(elem => {
      /* Calc total and percentual values and differences */
      const isVersatility = (elem.slug === 'versatility');

      let customKey,
        ratingExists,
        percentageValue,
        percentageDifference,
        value,
        difference;

      /* Versatility has different values */
      if (isVersatility) {
        customKey = `${elem.slug}${ data.role === 'HEALING' ? 'Healing' : 'Damage' }DoneBonus`;

        percentageValue = data[customKey];
        percentageDifference = compare({ base: data, comparedTo, key: customKey });

        value = data[elem.slug];
        difference = compare({ base: data, comparedTo, key: elem.slug });

      /* Powers */
      } else if (elem.isPower) {
        /* Early return for other powers */
        if (elem.slug !== data.powerType) {
          return;
        }

        customKey = 'power';

        value = data[customKey];
        difference = compare({ base: data, comparedTo, key: customKey });

      /* Default values*/
      } else {
        /* Detect if there is a percentage value */
        ratingExists = (typeof data[`${elem.slug}Rating`] !== 'undefined');

        percentageValue = ratingExists
          ? data[elem.slug]
          : undefined;

        percentageDifference = ratingExists
          ? compare({ base: data, comparedTo, key: elem.slug })
          : undefined;

        value = ratingExists
          ? data[`${elem.slug}Rating`]
          : data[elem.slug];

        difference = comparedTo 
          ? compare({ base: data, comparedTo, key: ratingExists
              ? `${elem.slug}Rating`
              : elem.slug,
          })
          : undefined;
      }

      return (
        <CharacterAttribute
          key={`attr-${elem.slug}`}
          label={elem.name}
          value={value}
          difference={difference}
          percentageValue={percentageValue}
          percentageDifference={percentageDifference}
          hideLabels={hideLabels}
          isPercentage={ratingExists || isVersatility}
        />
      );
    })}
  </div>
);

CharacterAttributesGroup.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })).isRequired,
  data: PropTypes.object.isRequired,
  comparedTo: PropTypes.object,
  hideLabels: PropTypes.bool,
};
CharacterAttributesGroup.defaultProps = {
  hideLabels: false,
};
CharacterAttributesGroup.displayName = 'CharacterAttributesGroup';

export default CharacterAttributesGroup;