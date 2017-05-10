import React, { PropTypes } from 'react';
import { formatIntegers } from '../utils/calcs.js';

const CharacterAttribute = ({
  label,
  value,
  difference,
  percentageValue,
  percentageDifference,
  hideLabels,
  isPercentage,
}) => (
  <div className="CharacterAttributes-item">
    {/* Show labels */}
    {!hideLabels &&
      <span className="CharacterAttributes-label">{label}</span>
    }

    {/* Show difference */}
    {typeof difference !== 'undefined' &&
      <span className={`CharacterAttributes-value Comparator-difference ${(difference > 0) ? 'Comparator--greater' : 'Comparator--lower'}`}>
        { (difference > 0) ? `+${formatIntegers(difference)}` : formatIntegers(difference)}{isPercentage ? '%' : ''}
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
      {`${formatIntegers(parseInt(value, 10))}${isPercentage ? '%' : ''}`}
      {typeof percentageValue !== 'undefined' &&
        <span>
          <br />
          {parseInt(percentageValue, 10)}%
        </span>
      }
    </span>
  </div>
);

CharacterAttribute.propTypes = {
  label: PropTypes.string.isRequired,
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