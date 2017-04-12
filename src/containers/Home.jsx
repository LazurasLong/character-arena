import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCharacter, fetchRival } from '../actions/characters.js';

class Home extends Component {
  static propTypes = {
    character: PropTypes.shape({
    }),
    rival: PropTypes.shape({
    }),
  };

  static defaultProps = {
    character: {},
    rival: {},
  };

  static displayName = 'Home';

  render() {
    const {
      character,
      rival,
    } = this.props;

    return (
      <div className="CharacterComparision">
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    character: state.character,
    rival: state.rival,
  };
};

export default connect(
  mapStateToProps
)(Home);
