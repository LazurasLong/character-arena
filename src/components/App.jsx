import React, { Component } from 'react';

import Home from '../containers/Home.jsx';

export default class App extends Component {
  static displayName = 'App';

  render() {
    return (
      <div className="height">
        { this.props.children }
      </div>
    );
  }
}
