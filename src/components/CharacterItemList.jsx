import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compare } from '../utils/calcs.js';

import CharacterItem from '../components/CharacterItem.jsx';

export default class CharacterItemList extends Component {
  static propTypes = {
    elements: PropTypes.array.isRequired,
    items: PropTypes.object.isRequired,
    comparedTo: PropTypes.object,
    character: PropTypes.shape({
      name: PropTypes.string.isRequired,
      realm: PropTypes.string.isRequired,
    }).isRequired,
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
      character,
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
            character={character}
            handleShowItemDetail={handleShowItemDetail}
          />
        ))}
      </div>
    );
  }
}
