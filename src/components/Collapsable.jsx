import React, { Component, PropTypes } from 'react';
import imageResolver from '../utils/image-resolver.js';

export default class Collapsable extends Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
    }).isRequired,
    disabled: PropTypes.bool,
  };
  
  static defaultProps = {
    disabled: false,
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
    const { handleToggleCollapsable, disabled } = this.props;

    if (!disabled) {
      // If custom function was sent, use it
      if (handleToggleCollapsable) {
        return handleToggleCollapsable({ element: this });
      }

      // Set 'isOpen' as opposed
      return this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
    const { data, disabled, children } = this.props;
    
    const isOpen = (data && typeof data.isOpen !== 'undefined') ? data.isOpen : this.state.isOpen;

    return (
      <section className={`Collapsable ${isOpen || disabled ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}>
        <div className="Collapsable-head" onClick={this.handleToggle}>
          <h2 className="Collapsable-title">{data.title}</h2>
          {!disabled &&
            <span className="Collapsable-icon" />
          }
        </div>
        <div className="Collapsable-body" style={{backgroundImage: `url(${imageResolver('../images/background.jpg')})`}}>
          {children}
        </div>
      </section>
    );
  }
};