import React, { Component, PropTypes } from 'react';

import Select from '../components/inputs/Select.jsx';
import Input from '../components/inputs/Input.jsx';
import Error from '../components/inputs/Error.jsx';

import Collapsable from '../components/Collapsable.jsx';

class CharacterFinder extends Component {
  static propTypes = {
    reference: PropTypes.func,
    collapsableData: PropTypes.object.isRequired,
    availableRealms: PropTypes.array.isRequired,
    handleFetchCharacter: PropTypes.func.isRequired,
    handleToggleCollapsable: PropTypes.func,
    error: PropTypes.object,
  };

  static displayName = 'CharacterFinder';

  render() {
    const {
      reference,
      collapsableData,
      handleToggleCollapsable,
      handleFetchCharacter,
      availableRealms,
      error,
    } = this.props;

    return (
      <div className="Character">
        
        {/* Filters */}
        <Collapsable
          title="New character"
          slug="filters"
          data={collapsableData}
          ref={reference}
          handleToggleCollapsable={handleToggleCollapsable}
        >
          <div className="Character-filters">
            {/* Dropdown with realms */}
            <Select
              options={availableRealms}
              placeholder="Character's realm"
              required
              reference={(ref) => { this.realm = ref; }}
            />
          
            {/* User will write character's name */}
            <Input
              type="text"
              placeholder="Character's name"
              required
              reference={(ref) => { this.characterName = ref; }}
            />

            {/* Search button */}
            <button
              className="Button"
              onClick={() => { handleFetchCharacter({
                realm: this.realm.value,
                characterName: this.characterName.value,
              }); }
            }>
              Search
            </button>

            {error &&
              <Error error={error} />
            }
          </div>
        </Collapsable>
      </div>
    );
  }
}

export default CharacterFinder;