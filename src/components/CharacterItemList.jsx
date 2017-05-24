import React, { PropTypes, Component } from 'react';
import { compare } from '../utils/calcs.js';

import CharacterItem from '../components/CharacterItem.jsx';

export default class CharacterItemList extends Component {
  static propTypes = {
    elements: PropTypes.array.isRequired,
    items: PropTypes.object.isRequired,
    comparedTo: PropTypes.object,
    handleShowItemDetail: PropTypes.func.isRequired,
  };

  static defaultProps = {
    comparedTo: {},
  };

  static displayName = 'CharacterItemList';

  render() {
    const {
      elements,
      items,
      comparedTo,
      handleShowItemDetail,
    } = this.props;

    return (
      <div className="Character-items clearfix">
        {elements.map(elem => (
          <CharacterItem
            key={`item-${elem}`}
            element={elem}
            item={items[elem]}
            comparedTo={comparedTo[elem]}
            handleShowItemDetail={handleShowItemDetail}
          />
        ))}
      </div>
    );
  }
}
