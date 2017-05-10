import React, { Component, PropTypes } from 'react';

import Select from '../components/inputs/Select.jsx';
import Input from '../components/inputs/Input.jsx';
import Error from '../components/inputs/Error.jsx';
import { Loading } from '../components/Loading.jsx';

import Collapsable from '../components/Collapsable.jsx';

const initialState = {
  valid: false,
  touched: false,
  submitting: false,
  submitted: false,
  realm: {
    valid: true,
    error: '',
  },
  characterName: {
    valid: true,
    error: '',
  },
};

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

  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.state = {
      ...initialState,
    };
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const {
      realm,
      characterName,
      props: { handleFetchCharacter },
    } = this;

    /* Reset custom validation */
    let validation = {
      ...initialState,
      valid: true,
      touched: true,
    };

    /* Character name is required */
    if (!characterName.value || !characterName.value.length || characterName.value === ' ') {
      validation = {
        ...validation,
        valid: false,
        characterName: {
          valid: false,
          error: 'Character name is required',
        },
      };
    }

    /* Save validation */
    this.setState({
      ...validation,
    });

    /* Valid form */
    if (validation.valid) {
      /* Submit */
      handleFetchCharacter({ realm: realm.value, characterName: characterName.value });

      /* Clean character name */
      characterName.value = '';
    }
  }

  render() {
    const {
      reference,
      collapsableData,
      handleToggleCollapsable,
      handleFetchCharacter,
      availableRealms,
      error,
    } = this.props;

    const {
      realm,
      characterName,
    } = this.state;

    return (
      <div className="Character">
        
        {/* Filters */}
        <Collapsable
          data={collapsableData}
          ref={reference}
          handleToggleCollapsable={handleToggleCollapsable}
          disabled
        >
          <form className="Character-filters" onSubmit={this.handleOnSubmit} noValidate>
            {/* Dropdown with realms */}
            <Select
              name="realm"
              options={availableRealms}
              reference={(ref) => { this.realm = ref; }}
              placeholder="Character's realm"
              required
              error={!realm.valid ? realm : undefined}
            />
          
            {/* User will write character's name */}
            <Input
              name="characterName"
              reference={(ref) => { this.characterName = ref; }}
              placeholder="Character's name"
              required
              error={!characterName.valid ? characterName : undefined}
            />

            {/* Search button */}
            <button type="submit" className="Button">Search</button>

            {error &&
              <Error error={error} />
            }
          </form>
        </Collapsable>
      </div>
    );
  }
}

export default CharacterFinder;