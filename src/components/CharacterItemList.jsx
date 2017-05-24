import React, { PropTypes, Component } from 'react';
import { compare } from '../utils/calcs.js';

import CharacterItem from '../components/CharacterItem.jsx';

export default class CharacterItemList extends Component {
  static propTypes = {
    
  };

  static defaultProps = {

  };

  static displayName = 'CharacterItemList';

  render() {
    const {
      elements,
      items,
      comparedTo,
    } = this.props;

    return (
      <div className="Character-items clearfix">
        {elements.map(elem => (
          <CharacterItem
            key={`item-${elem}`}
            element={elem}
            item={items[elem]}
            comparedTo={comparedTo && comparedTo[elem]}
          />
        ))}
      </div>
    );
  }
}
