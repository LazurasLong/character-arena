import React, { Component, PropTypes } from 'react';

export default class Collapsable extends Component {
  static propTypes = {
    title: PropTypes.string,
  };
  
  static defaultProps = {
    title: '',
  };

  static displayName = 'Collapsable';

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  handleToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { title, children } = this.props;
    const { isOpen } = this.state;

    return (
      <section className={`Collapsable ${isOpen ? 'is-open' : ''}`}>
        <div className="Collapsable-head" onClick={this.handleToggle}>
          <h2 className="Collapsable-title">{title}</h2>
          <span className="Collapsable-icon" />
        </div>

        <div className="Collapsable-body">{children}</div>
      </section>
    );
  }
};