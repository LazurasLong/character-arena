import React, { Component, PropTypes } from 'react';

import { REGIONS } from '../constants/app.js';

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

    return (
      <aside className={`Sidebar ${isOpen && 'is-open'}`}>
        
        {/* Sidebar head */}
        <div className="Sidebar-head">
          
          {/* Close button */}
          <span
            className="Button Button--invisible Button--close Sidebar-close"
            onClick={handleToggleSidebar}
          />

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

          {/* Character selector */}
          <Collapsable
            title="Character selector"
            slug="filters"
            data={sections.filters}
            ref={(ref) => { this.filters = ref; }}
            handleToggleCollapsable={handleToggleCollapsable}
          />

          {/* Item level */}
          <Collapsable
            title="Item level"
            slug="itemLevel"
            data={sections.itemLevel}
            ref={(ref) => { this.itemLevel = ref; }}
            handleToggleCollapsable={handleToggleCollapsable}
          />

          {/* Main attributes */}
          <Collapsable
            title="Attributes"
            slug="attributes"
            data={sections.attributes}
            ref={(ref) => { this.attributes = ref; }}
            handleToggleCollapsable={handleToggleCollapsable}
          />

          {/* Secondary attributes */}
          <Collapsable
            title="Enhacements"
            slug="enhacements"
            data={sections.enhacements}
            ref={(ref) => { this.enhacements = ref; }}
            handleToggleCollapsable={handleToggleCollapsable}
          />

          {/* Deffense */}
          <Collapsable
            title="Deffense"
            slug="deffense"
            data={sections.deffense}
            ref={(ref) => { this.deffense = ref; }}
            handleToggleCollapsable={handleToggleCollapsable}
          />

          {/* Talents */}
          <Collapsable
            title="Talents"
            slug="talents"
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