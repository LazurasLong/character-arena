import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCharacter, fetchRival } from '../actions/characters.js';

class Comparator extends Component {
  static propTypes = {
    characters: PropTypes.shape({
      character: PropTypes.shape({
      }),
      rival: PropTypes.shape({
      }),
    }).isRequired,
  };

  static displayName = 'Comparator';

  constructor(props) {
    super(props);

    this.handleGetCharacter = this.handleGetCharacter.bind(this);
  }

  handleGetCharacter() {
    const { dispatch } = this.props;

    dispatch(fetchCharacter({}));
  }

  render() {
    const {
      character,
      rival,
    } = this.props.characters;

    return (
      <div className="CharacterComparision">
        <div className="Character">
          Character: {character && character.name}
          &nbsp;|&nbsp;
          <button
            onClick={this.handleGetCharacter}
          >
            Get
          </button>
        </div>
        <div className="Character Character--rival">Rival: {rival && rival.name}</div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    characters: state.characters,
  };
};

export default connect(
  mapStateToProps
)(Comparator);
