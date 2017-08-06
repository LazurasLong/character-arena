import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../components/inputs/Input.jsx';
import Icon from '../components/Icon.jsx';

import { FACEBOOK_KEY } from '../../.env.js';

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

    this.handleFacebookShare = this.handleFacebookShare.bind(this);
    this.handleTwitterShare = this.handleTwitterShare.bind(this);
    this.handleWhatsappShare = this.handleWhatsappShare.bind(this);

    this.state = {
      isModalOpen: false,
    };
  }

  componentWillUpdate() {
    if (typeof window !== 'undefined' && this.shareUrl) {
      this.shareUrl.value = decodeURI(window.location.href);
    }
  }

  handleFacebookShare() {
    const url = encodeURIComponent(location.href);

    window.open(`https://www.facebook.com/dialog/share?app_id=${FACEBOOK_KEY}&href=${url}&display=popup&redirect_uri=${url}`, 'Share on Facebook');
  }

  handleTwitterShare() {
    const { handleGetShareTitle } = this.props;
    const url = encodeURIComponent(location.href);
    
    window.open(`http://twitter.com/share?text=${handleGetShareTitle()}&url=${url}&hashtags=CharacterArena`, 'Share on Twitter');
  }

  handleWhatsappShare() {
    const { handleGetShareTitle } = this.props;
    const url = encodeURIComponent(location.href);

    window.open(`whatsapp://send?text=${handleGetShareTitle()} - ${url}`, 'Share on Whatsapp');
  };

  render() {
    const {
      className,
    } = this.props;

    return (
      <div className={`Share ${className}`}>
        {/* Facebook */}
        <button className="Button Button--invisible Button--icon Share-button"
          title="Share on Facebook"
          onClick={this.handleFacebookShare}
        >
          <Icon className="Button-icon Share-buttonIcon" icon="social-facebook" />
        </button>

        {/* Twitter */}
        <button className="Button Button--invisible Button--icon Share-button"
          title="Share on Twitter"
          onClick={this.handleTwitterShare}
        >
          <Icon className="Button-icon Share-buttonIcon" icon="social-twitter" />
        </button>

        {/* Whatsapp */}
        <button className="Button Button--invisible Button--icon Share-button mobile"
          title="Share on Whatsapp"
          onClick={this.handleWhatsappShare}
        >
          <Icon className="Button-icon Share-buttonIcon" icon="whatsapp" />
        </button>

        {/* Generic Share */}
        <button className="Button Button--invisible Button--icon Share-button"
          title="Share this URL"
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
              reference={(ref) => { this.shareUrl = ref; }}
            />
          </div>
        </div>
      </div>
    );
  }
};
