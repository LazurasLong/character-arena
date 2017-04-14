import React, { Component, PropTypes } from 'react';

import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleToggleStat = this.handleToggleStat.bind(this);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);

    this.state = {
      isSidebarOpen: false,
      stats: [
        { label: 'strength', selected: false },
      ],
    };
  }

  handleToggleStat(selectedStat) {
    const { state } = this;

    this.setState({
      stats: state.stats.map(s => {
        if (s.label === selectedStat.label) {
          return {
            ...s,
            selected: !s.selected,
          };
        }

        return s;
      })
    });
  }

  handleToggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  }

  render() {
    const {
      isSidebarOpen,
      stats,
    } = this.state;

    const options = { region: 'us', language: 'en' };

    return (
      <div>
        <Sidebar
          options={options}
          isOpen={isSidebarOpen}
          stats={stats}
          handleToggleStat={this.handleToggleStat}
          handleToggleSidebar={this.handleToggleSidebar}
        />
        <Header handleToggleSidebar={this.handleToggleSidebar} />
        {this.props.children}
        <Footer options={options}/>
      </div>
    );
  }
};

App.displayName = 'App';

export default App;