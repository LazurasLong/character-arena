import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCharacter, fetchRival } from '../actions/characters.js';
import { fetchRaces, fetchClasses, fetchRealms } from '../actions/resources.js';

import CharacterFrame from '../components/CharacterFrame.jsx';

class Comparator extends Component {
  static propTypes = {
    characters: PropTypes.shape({
      character: PropTypes.shape({
      }),
      rival: PropTypes.shape({
      }),
    }).isRequired,
    resources: PropTypes.shape({
      races: PropTypes.shape({
        collection: PropTypes.array,
        isFetching: PropTypes.bool,
      }),
      classes: PropTypes.shape({
        collection: PropTypes.array,
        isFetching: PropTypes.bool,
      }),
      realms: PropTypes.shape({
        collection: PropTypes.array,
        isFetching: PropTypes.bool,
      }),
    }).isRequired,
  };

  static displayName = 'Comparator';

  constructor(props) {
    super(props);

    this.handleFetchCharacter = this.handleFetchCharacter.bind(this);
    this.handleFetchRival = this.handleFetchRival.bind(this);
  }

  componentWillMount() {
    const {
      params,
      dispatch,
    } = this.props;

    const dataToFetch = [
      dispatch(fetchRaces()),
      dispatch(fetchClasses()),
      dispatch(fetchRealms()),
    ];

    Promise.all(dataToFetch)
      .then(() => dispatch(fetchCharacter({})));
  }

  handleFetchCharacter({ realm, characterName }) {
    const { dispatch } = this.props;

    dispatch(fetchCharacter({ realm, characterName }));
  }

  handleFetchRival({ realm, characterName }) {
    const { dispatch } = this.props;

    dispatch(fetchRival({ realm, characterName }));
  }

  render() {
    const {
      characters: {
        character,
        rival,
      },
      resources: {
        classes,
        races,
        realms,
      },
    } = this.props;

    return (
      <div className="Comparator">
        <div className="Character">
          <h1 className="Character-title">Your character</h1>
          <CharacterFrame
            classes={classes.collection}
            races={races.collection}
            availableRealms={realms.collection}
            handleFetchCharacter={this.handleFetchCharacter}
            character={character}
          />
        </div>
        {(
          (character && character.name && !character.isFetching)
          || (rival && rival.name && !rival.isFetching)
        ) &&
          <div className="Character">
            <h1 className="Character-title">Your rival</h1>
            <CharacterFrame
              classes={classes.collection}
              races={races.collection}
              availableRealms={realms.collection}
              handleFetchCharacter={this.handleFetchRival}
              character={rival}
              comparedTo={character}
              isRival
            />
          </div>
        }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    characters: state.characters,
    resources: state.resources,
  };
};

export default connect(
  mapStateToProps
)(Comparator);
