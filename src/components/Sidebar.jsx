import React, { PropTypes } from 'react';

import CustomCheckbox from '../components/inputs/CustomCheckbox.jsx';

const Sidebar = ({
  isOpen,
  stats,
  handleToggleStat,
  handleToggleSidebar,
}) => (
  <aside className={`Sidebar ${isOpen && 'is-open'}`}>
    <div className="Sidebar-head">
      <div
        className="Button Button--invisible Button--close Sidebar-close"
        onClick={handleToggleSidebar}
      />
      <img className="Sidebar-logo" />
      <span className="Sidebar-label">Stats to show</span>
    </div>
    <span className="Spacer" />
    <div className="Sidebar-content">
      <ul>
        { stats && stats.map((stat, index) => {
          return (
            <li className="Sidebar-element" key={index}>
              <CustomCheckbox
                label={stat.label}
                selected={stat.selected}
                handleClick={() => { handleToggleStat(stat); }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  </aside>
);

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  stats: PropTypes.array,
  handleToggleStat: PropTypes.func.isRequired,
  handleToggleSidebar: PropTypes.func.isRequired,
};
Sidebar.defaultProps = {
  isOpen: false,
  stats: [],
};
Sidebar.displayName = 'Sidebar';

export default Sidebar;