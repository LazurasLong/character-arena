import React, { PropTypes } from 'react';
import imageResolver from '../utils/image-resolver.js';

import Icon from '../components/Icon.jsx';

import { TITLE } from '../constants/app.js';

const Header = ({
  handleToggleSidebar,
}) => (
  <header className="Header">
    <div className="Header-bar">
      <button className="Button Button--invisible Button--icon Header-menu" onClick={handleToggleSidebar}>
        <Icon className="Button-icon" icon="menu" />
      </button>
      <img
        alt="App logo"
        className="Header-logo"
        src={imageResolver('../images/favicons/favicon-96x96.png')}
      />
      <span className="Header-label">{TITLE}</span>
    </div>
  </header>
);

Header.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
};
Header.displayName = 'Header';

export default Header;
