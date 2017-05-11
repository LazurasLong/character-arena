import React, { PropTypes } from 'react';
import { compare, getSpecResource } from '../utils/calcs.js';

import CharacterAttribute from '../components/CharacterAttribute.jsx';

const CharacterAttributesGroup = ({
  elements,
  data,
  spec,
  comparedTo,
  hideLabels,
}) => (
  <div className={`CharacterAttributes ${hideLabels ? 'CharacterAttributes--right' : ''}`}>

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
        /* Early return for other powers, or powers differents than comparedTo */
        if (
          (!comparedTo && elem.slug !== data.powerType)
          || (comparedTo && comparedTo.powerType && elem.slug !== comparedTo.powerType)
        ) {
          return;
        }

        /* Using different powerTypes */
        if (comparedTo && data.powerType !== comparedTo.powerType) {
          value = 0;

        /* Using the same powerType */
        } else {
          value = data['power'];
        }
        difference = compare({ base: data, comparedTo, key: customKey });

      /* Spec resources */
      } else if (elem.isSpecBased) {
        /* Early return for other resources */
        if (!getSpecResource({
          powerType: data.powerType,
          role: data.role,
          resource: elem.slug,
          spec,
        })) {
          return;
        }

        value = data[elem.slug];
        difference = compare({ base: data, comparedTo, key: elem.slug });

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
          slug={elem.slug}
          icon={elem.icon}
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
  spec: PropTypes.string.isRequired,
  comparedTo: PropTypes.object,
  hideLabels: PropTypes.bool,
};
CharacterAttributesGroup.defaultProps = {
  hideLabels: false,
};
CharacterAttributesGroup.displayName = 'CharacterAttributesGroup';

export default CharacterAttributesGroup;