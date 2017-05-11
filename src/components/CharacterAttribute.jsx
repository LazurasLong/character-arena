import React, { PropTypes } from 'react';
import { formatIntegers } from '../utils/calcs.js';

import Icon from '../components/Icon.jsx';

const CharacterAttribute = ({
  label,
  slug,
  icon,
  value,
  difference,
  percentageValue,
  percentageDifference,
  hideLabels,
  isPercentage,
}) => (
  <div className={`CharacterAttributes-item color--${slug}`}>
    {/* Show labels */}
    {!hideLabels &&
      <span className="CharacterAttributes-label">
        <Icon className="CharacterAttributes-icon" icon={icon || slug} />
        <span>{label}</span>
      </span>
    }

    {/* Show difference */}
    <span className="CharacterAttributes-valuesWrapper">
      {typeof difference !== 'undefined' &&
        <span className={`CharacterAttributes-value Comparator-difference ${(difference > 0) ? 'Comparator--greater' : 'Comparator--lower'}`}>
          { (difference > 0) ? `+${formatIntegers(difference)}` : formatIntegers(difference)}
          {typeof percentageDifference !== 'undefined' &&
            <span>
              <br />
              { (percentageDifference > 0) ? `+${percentageDifference}` : percentageDifference}%
            </span>
          }
        </span>
      }

      {/* Show values */}
      <span className="CharacterAttributes-value">
        {`${formatIntegers(parseInt(value, 10))}`}
        {typeof percentageValue !== 'undefined' &&
          <span>
            <br />
            {parseInt(percentageValue, 10)}%
          </span>
        }
      </span>
    </span>
  </div>
);

CharacterAttribute.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  icon: PropTypes.string,
  value: PropTypes.number.isRequired,
  difference: PropTypes.number,
  percentageValue: PropTypes.number,
  percentageDifference: PropTypes.number,
  hideLabels: PropTypes.bool,
  isPercentage: PropTypes.bool,
};
CharacterAttribute.defaultProps = {
  hideLabels: false,
  isPercentage: false,
};
CharacterAttribute.displayName = 'CharacterAttribute';

export default CharacterAttribute;