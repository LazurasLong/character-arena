import React, { PropTypes } from 'react';

const Attribute = ({
  label,
  value,
  difference,
  percentageValue,
  percentageDifference,
  hideLabels,
  isPercentage,
}) => (
  <div className="Attributes-item">
    {/* Show labels */}
    {!hideLabels &&
      <span className="Attributes-label">{label}</span>
    }

    {/* Show values */}
      <span className="Attributes-value">
        {`${parseInt(value, 10)}${isPercentage ? '%' : ''}`}
        {typeof percentageValue !== 'undefined' &&
          <span>
            <br />
            {parseInt(percentageValue, 10)}%
          </span>
        }
      </span>

    {/* Show difference */}
    {typeof difference !== 'undefined' &&
      <span className={`Attributes-value Comparator-difference ${(difference > 0) ? 'Comparator--greater' : 'Comparator--lower'}`}>
        { (difference > 0) ? `+${difference}` : difference}{isPercentage ? '%' : ''}
        {typeof percentageDifference !== 'undefined' &&
          <span>
            <br />
            { (percentageDifference > 0) ? `+${percentageDifference}` : percentageDifference}%
          </span>
        }
      </span>
    }
    <br />
  </div>
);

Attribute.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  difference: PropTypes.number,
  percentageValue: PropTypes.number,
  percentageDifference: PropTypes.number,
  hideLabels: PropTypes.bool,
  isPercentage: PropTypes.bool,
};
Attribute.defaultProps = {
  hideLabels: false,
  isPercentage: false,
};
Attribute.displayName = 'Attribute';

export default Attribute;