import React, { PropTypes, Component } from 'react';

import Select from '../components/inputs/Select.jsx';
import Input from '../components/inputs/Input.jsx';
import Loading from '../components/Loading.jsx';
import Error from '../components/inputs/Error.jsx';
import Spacer from '../components/Spacer.jsx';
import Avatar from '../components/Avatar.jsx';
import Class from '../components/Class.jsx';
import ItemLevel from '../components/ItemLevel.jsx';
import MainAttributes from '../components/MainAttributes.jsx';
import SecondaryAttributes from '../components/SecondaryAttributes.jsx';

export default class CharacterFrame extends Component {
  static propTypes = {
    classes: PropTypes.array,
    races: PropTypes.array,
    availableRealms: PropTypes.array,
    handleFetchCharacter: PropTypes.func.isRequired,
    character: PropTypes.shape({
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      race: PropTypes.number,
      class: PropTypes.number,
      items: PropTypes.object,
      stats: PropTypes.object,
    }).isRequired,
    comparedTo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      race: PropTypes.number.isRequired,
      class: PropTypes.number.isRequired,
      items: PropTypes.object.isRequired,
      stats: PropTypes.object.isRequired,
    }),
    isRival: PropTypes.bool,
  };

  static defaultProps = {
    classes: [],
    races: [],
    availableRealms: [],
    isRival: false,
  };

  static displayName = 'CharacterFrame';

  render() {
    const {
      classes,
      races,
      availableRealms,
      handleFetchCharacter,
      character,
      comparedTo,
      isRival,
    } = this.props;

    const characterClass = classes.find(r => r.id === character.class);

    return (
      <div>
        
        {/* Filters */}
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
        </div>
        
        {/* Loading character */}
        {character && character.isFetching &&
          <Loading />
        }

        {/* Character info */}
        {character && character.name && !character.isFetching &&
          <div className="Character-character">
            <Spacer />

            <Avatar
              picture={character.thumbnail}
              faction={races.find(r => r.id === character.race).side}
            />
            <p className="Character-name">{character.name}</p>
            <Class className="Character-class" characterClass={characterClass} />
            <Spacer />

            <h2 className="Character-section">Item level</h2>
            <ItemLevel
              items={character.items}
              comparedTo={comparedTo && comparedTo.items}
              hideLabels={isRival}
            />

            <h2 className="Character-section">Attributes</h2>
            <MainAttributes
              stats={character.stats}
              comparedTo={comparedTo && comparedTo.stats}
              hideLabels={isRival}
            />

            <h2 className="Character-section">Enhacements</h2>
            <SecondaryAttributes
              stats={character.stats}
              comparedTo={comparedTo && comparedTo.stats}
              hideLabels={isRival}
            />
          </div>
        }

        {/* Handle error */}
        {character && character.error &&
          <Error error={character.error} />
        }
      </div>
    )
  }
};