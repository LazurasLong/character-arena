import React, { PropTypes, Component } from 'react';
import imageResolver from '../utils/image-resolver';
import { getItemQualityName } from '../utils/calcs';

import TalentsIcon from '../components/CharacterTalentsIcon';

export default class CharacterItem extends Component {
  static propTypes = {
    element: PropTypes.string.isRequired,
    item: PropTypes.object,
    comparedTo: PropTypes.object,
    character: PropTypes.shape({
      name: PropTypes.string.isRequired,
      realm: PropTypes.string.isRequired,
    }).isRequired,
    handleShowItemDetail: PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

  static displayName = 'CharacterItem';

  render() {
    const {
      element,
      item,
      comparedTo,
      character,
      handleShowItemDetail,
    } = this.props;

    /* No item equipped */
    if (!item) {
      return (
        <div className={`Item Item--empty Item--${element}`}>
          <div className="Item-icon" style={{ backgroundImage: `url(${imageResolver('../images/item-slots.png')})` }} />
        </div>
      );
    }

    /* Calc item quality */
    const quality = getItemQualityName(item.quality);

    let difference;
    if (comparedTo) {
      difference = item.itemLevel - comparedTo.itemLevel;
    }

    /* Render item */
    return (
      <div
        className={`
          Item
          ${comparedTo ? 'Item--difference' : ''}
          Item--${quality}
          ${(item.tooltipParams && item.tooltipParams.transmogItem) ? 'Item--transmogrified' : ''}
          clearfix
        `}
        onClick={() => { handleShowItemDetail({ character, item }) }}
      >
        {/* Item icon */}
        <TalentsIcon
          className="Item-icon"
          icon={item.icon}
        />

        {/* Item info */}
        <div className="Item-info">

          {/* Item name */}
          <span className="Item-name">{item.name}</span>

          {/* Item ilvl */}
          <span className="Item-itemLevel">
            {typeof difference !== 'undefined' && difference !== 0 &&
              <span className={`Item-itemLevelDifference ${difference > 0 && 'is-greater'} ${difference < 0 && 'is-lower'}`}>
                {difference > 0 ? `+${difference}` : difference}
              </span>
            }
            <span className="Item-itemLevelValue">{item.itemLevel}</span>
          </span>
        </div>
      </div>
    );
  }
}
