import React from 'react';
import PropTypes from 'prop-types';
import { compare, getSpecResource } from '../utils/calcs.js';

import CharacterAttribute from '../components/CharacterAttribute.jsx';

const CharacterAttributesGroup = ({
  elements,
  data,
  spec,
  comparedTo,
  shouldCompare,
}) => (
  <div className={`CharacterAttributes ${shouldCompare ? 'CharacterAttributes--right' : ''}`}>

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
          ((!shouldCompare || !comparedTo) && elem.slug !== data.powerType)
          || (shouldCompare && comparedTo && comparedTo.powerType && elem.slug !== comparedTo.powerType)
        ) {
          return;
        }

        /* Using different powerTypes */
        if (shouldCompare && comparedTo && data.powerType !== comparedTo.powerType) {
          value = 0;

        /* Using the same powerType */
        } else {
          value = data['power'];
        }
        difference = compare({ base: data, comparedTo, key: customKey });

      /* Spec resources */
      } else if (elem.isSpecBased) {
        /* Early return for other resources, or resources differents than comparedTo */
        if (
          ((!shouldCompare || !comparedTo) && !getSpecResource({
            powerType: data.powerType,
            role: data.role,
            resource: elem.slug,
            spec,
          }))
          || (shouldCompare && comparedTo && !getSpecResource({
            powerType: comparedTo.powerType,
            role: comparedTo.role,
            resource: elem.slug,
            spec,
          }))
        ) {
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
          difference={shouldCompare ? difference : undefined}
          percentageValue={percentageValue}
          percentageDifference={shouldCompare ? percentageDifference : undefined}
          shouldCompare={shouldCompare}
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