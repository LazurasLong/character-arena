import React, { Component, PropTypes } from 'react';

import { REGIONS } from '../constants/app.js';

import Icon from '../components/Icon.jsx';
import Select from '../components/inputs/Select.jsx';
import Collapsable from '../components/Collapsable.jsx';

class Sidebar extends Component {
  render() {
    const {
      isOpen,
      options,
      sections,
      handleToggleCollapsable,
      handleToggleSidebar,
      handleSelectRegion,
      handleSelectLanguage,
    } = this.props;

    const that = this;

    return (
      <aside className={`Sidebar ${isOpen ? 'is-open' : ''}`}>
        
        {/* Sidebar head */}
        <div className="Sidebar-head">
          
          {/* Close button */}
          <button
            className="Button Button--icon Button--invisible Sidebar-close"
            onClick={handleToggleSidebar}
          >
            <Icon className="Button-icon" icon="close" />
          </button>

          {/* Sidebar title */}
          <span className="Sidebar-label">Options</span>
          <br style={{ clear: 'both' }} />
        </div>
        
        {/* Sidebar content */}
        <div className="Sidebar-body">
          <Select
            placeholder="Select your region"
            options={REGIONS}
            reference={(ref) => { this.region = ref; }}
            handleChange={handleSelectRegion}
            value={options.region}
          />
          <br />
          <Select
            placeholder="Select your language"
            options={REGIONS.find(reg => reg.slug === options.region).languages}
            reference={(ref) => { this.language = ref; }}
            handleChange={handleSelectLanguage}
            value={options.language}
          />
          <br />

          {/* Loop through different sections */}
          {Object.keys(sections).map((key) => {
            const section = sections[key];

            /* If there are no elements, return null */
            if (!section.elements) {
              return;
            }

            /* Return collapsable section */
            return (
              <Collapsable
                key={`sidebar-${section.slug}`}
                data={section}
                ref={(ref) => { that[section.slug] = ref; }}
                handleToggleCollapsable={handleToggleCollapsable}
              />
            );
          })}

          {/* Talents */}
          <Collapsable
            data={sections.talents}
            ref={(ref) => { this.talents = ref; }}
            handleToggleCollapsable={handleToggleCollapsable}
          />
        </div>
      </aside>
    );
  };
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  options: PropTypes.object.isRequired,
  sections: PropTypes.object.isRequired,
  handleToggleSidebar: PropTypes.func.isRequired,
  handleToggleCollapsable: PropTypes.func.isRequired,
  handleSelectRegion: PropTypes.func.isRequired,
  handleSelectLanguage: PropTypes.func.isRequired,
};
Sidebar.defaultProps = {
  isOpen: false,
};
Sidebar.displayName = 'Sidebar';

export default Sidebar;