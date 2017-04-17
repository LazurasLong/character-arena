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
      /* If there is a status set, use it, if not, it's open by default */
      isOpen: (props.data && typeof props.data.isOpen !== 'undefined')
        ? props.data.isOpen
        : true,
    };
  }

  handleToggle() {
    const { handleToggleCollapsable } = this.props;

    // If custom function was sent, use it
    if (handleToggleCollapsable) {
      return handleToggleCollapsable({ element: this });
    }

    // Set 'isOpen' as opposed
    return this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { title, data, children } = this.props;
    
    const isOpen = (data && typeof data.isOpen !== 'undefined') ? data.isOpen : this.state.isOpen;

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