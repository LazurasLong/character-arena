import React, { PropTypes } from 'react';
import { compare } from '../utils/calcs.js';

import CharacterAttribute from '../components/CharacterAttribute.jsx';

const CharacterAttrs = ({
  elements,
  data,
  comparedTo,
  hideLabels,
}) => (
  <div className={`CharacterAttributes ${hideLabels && 'CharacterAttributes--right'}`}>

    {/* Loop through each attribute */}
    {elements.map(elem => {

      {/* Detect if there is a percentage value */}
      const ratingExists = (typeof data[`${elem.slug}Rating`] !== 'undefined');

      const percentageValue = ratingExists
        ? data[elem.slug]
        : undefined;

      const percentageDifference = ratingExists
        ? compare({ base: data, comparedTo, key: elem.slug })
        : undefined;

      const value = ratingExists
        ? data[`${elem.slug}Rating`]
        : data[elem.slug];

      const difference = comparedTo 
        ? compare({ base: data, comparedTo, key: ratingExists
            ? `${elem.slug}Rating`
            : elem.slug,
        })
        : undefined;

      return (
        <CharacterAttribute
          key={`attr-${elem.slug}`}
          label={elem.name}
          value={value}
          difference={difference}
          percentageValue={percentageValue}
          percentageDifference={percentageDifference}
          hideLabels={hideLabels}
          isPercentage={ratingExists}
        />
      );
    })}
  </div>
);

CharacterAttrs.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })).isRequired,
  data: PropTypes.object.isRequired,
  comparedTo: PropTypes.object,
  hideLabels: PropTypes.bool,
};
CharacterAttrs.defaultProps = {
  hideLabels: false,
};
CharacterAttrs.displayName = 'CharacterAttrs';

export default CharacterAttrs;