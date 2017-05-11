import React, { PropTypes, Component } from 'react';

import Input from '../components/inputs/Input.jsx';
import Icon from '../components/Icon.jsx';

export default class Share extends Component {
  static PropTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  static displayName = 'Share';

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  render() {
    const {
      className,
    } = this.props;

    return (
      <div className={`Share ${className}`}>
        {/* Facebook */}
        {/*<button className="Button Button--invisible Button--icon Share-button">
          <Icon className="Button-icon Share-buttonIcon" icon="social-facebook" />
        </button>*/}

        {/* Twitter */}
        {/*<button className="Button Button--invisible Button--icon Share-button">
          <Icon className="Button-icon Share-buttonIcon" icon="social-twitter" />
        </button>*/}

        {/* Whatsapp TODO: Not included on blizzard icons */}
        {/*<button className="Button Button--invisible Button--icon Share-button">
          <Icon className="Button-icon Share-buttonIcon" icon="social-whatsapp" />
        </button>*/}

        {/* Share */}
        <button className="Button Button--invisible Button--icon Share-button"
          onClick={() => { this.setState({ isModalOpen: true }) }}
        >
          <Icon className="Button-icon Share-buttonIcon" icon="external" />
        </button>

        {/* Share link modal */}
        <div className={`Share-modal ${this.state.isModalOpen ? 'is-open' : ''}`}>
          <div className="Share-modalBody">
            {/* Close button */}
            <button
              className="Button Button--icon Button--invisible Share-modalClose"
              onClick={() => { this.setState({isModalOpen: false}); }}
            >
              <Icon className="Button-icon" icon="close" />
            </button>

            {/* Modal title */}
            <h1 className="Share-modalTitle">Share this comparision</h1>

            {/* URL to share */}
            <Input
              className="Share-modalUrl"
              value={typeof window !== 'undefined' ? decodeURI(window.location.href) : undefined}
            />
          </div>
        </div>
      </div>
    );
  }
};
