import React, { PropTypes, Component } from 'react';
import imageResolver from '../utils/image-resolver';

import TalentsIcon from '../components/CharacterTalentsIcon';

export default class CharacterItem extends Component {
  static propTypes = {
    
  };

  static defaultProps = {

  };

  static displayName = 'CharacterItem';

  render() {
    const {
      element,
      item,
      comparedTo,
    } = this.props;

    /* No item equipped */
    if (!item) {
      return (
        <div className={`Item Item--empty Item--${element}`}>
          <div className="Item-icon" style={{backgroundImage: `url(${imageResolver('../images/item-slots.png')})`}} />
        </div>
      );
    }

    /* Calc item quality */
    let quality = '';
    switch(item.quality) {
      case 7:
        quality = 'reliq';
        break;
      case 6:
        quality = 'artifact';
        break;
      case 5:
        quality = 'legendary';
        break;
      case 4:
        quality = 'epic';
        break;
      case 3:
        quality = 'rare';
        break;
      case 2:
        quality = 'uncommon';
        break;
      case 1:
        quality = 'common';
        break;
      default:
        quality = 'garbage';
    };

    let difference;
    if (comparedTo) {
      difference = item.itemLevel - comparedTo.itemLevel;
    }


    /* Render item */
    return (
      <div className={`Item Item--${quality} ${comparedTo ? 'Item--difference' : ''} clearfix`}>
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
