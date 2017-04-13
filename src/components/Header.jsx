import React, { PropTypes } from 'react';

const Header = ({
  handleToggleSidebar,
}) => (
  <header className="Header">
    <div className="Header-bar">
      <img className="Header-logo" />
      <button className="Button Button--invisible Header-menu" onClick={handleToggleSidebar} />
      <span className="Header-label">WoW Character Comparision</span>
    </div>
  </header>
);

Header.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
};
Header.displayName = 'Header';

export default Header;