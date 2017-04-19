import React, { PropTypes } from 'react';

import imageResolver from '../utils/image-resolver.js';

import { TITLE } from '../constants/app.js';

const Header = ({
  handleToggleSidebar,
}) => (
  <header className="Header">
    <div className="Header-bar">
      <button className="Button Button--invisible Button--icon Header-menu" onClick={handleToggleSidebar}>
        <svg
          className="Button-icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/2000/xlink"
          viewBox="0 0 64 64"
        >
          <use xlinkHref={`${imageResolver('../images/blizzard-icons.svg')}#menu`} />
        </svg>
      </button>
      <img className="Header-logo" src={imageResolver('../images/favicons/favicon-96x96.png')} />
      <span className="Header-label">{TITLE}</span>
    </div>
  </header>
);

Header.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
};
Header.displayName = 'Header';

export default Header;
