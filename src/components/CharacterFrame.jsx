import React, { PropTypes, Component } from 'react';
import { getSlug } from '../utils/calcs.js';

import { WOWPROGRESS_CHAR, WOWPROGRESS_ICON, WORLDOFWARCRAFT_ARMORY, WORLDOFWARCRAFT_ICON } from '../constants/app.js';

import Select from '../components/inputs/Select.jsx';
import Input from '../components/inputs/Input.jsx';
import Loading from '../components/Loading.jsx';
import Error from '../components/inputs/Error.jsx';
import Spacer from '../components/Spacer.jsx';

import Collapsable from '../components/Collapsable.jsx';
import Avatar from '../components/Avatar.jsx';
import Class from '../components/Class.jsx';
import Specialization from '../components/Specialization.jsx';
import ItemLevel from '../components/ItemLevel.jsx';
import MainAttributes from '../components/MainAttributes.jsx';
import SecondaryAttributes from '../components/SecondaryAttributes.jsx';
import DeffenseAttributes from '../components/DeffenseAttributes.jsx';
import Talents from '../components/Talents.jsx';

export default class CharacterFrame extends Component {
  static propTypes = {
    classes: PropTypes.array,
    races: PropTypes.array,
    talents: PropTypes.object,
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
    talents: {},
    availableRealms: [],
    isRival: false,
  };

  static displayName = 'CharacterFrame';

  render() {
    const {
      classes,
      races,
      talents,
      availableRealms,
      handleFetchCharacter,
      character,
      comparedTo,
      isRival,
    } = this.props;

    // Get character class
    const characterClass = classes.find(r => r.id === character.class);
    if (characterClass) {
      characterClass.slug = getSlug(characterClass.name);
    }
  
    // Get talents for this class
    let availableTalents;
    if (characterClass) {
      for (let x in talents) {
        if (characterClass.slug === talents[x].class) {
          availableTalents = talents[x];
          break;
        }
      }
    }

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

        {/* Handle error */}
        {character && character.error &&
          <Error error={character.error} />
        }

        {/* Character info */}
        {character && character.name && !character.isFetching &&
          <div className="Character-character">
            <Spacer />

            <Avatar
              picture={character.thumbnail}
              faction={races.find(r => r.id === character.race).side}
            />
            <p className="Character-name Character-spec">
              <a
                className="Character-specIcon"
                title="View on World of Warcraft armory"
                target="_blank"
                ref="noopener noreferrer"
                href={WORLDOFWARCRAFT_ARMORY
                  .replace(':region', 'us')
                  .replace(':language', 'en')
                  .replace(':realm', character.realm)
                  .replace(':characterName', character.name)
              }><img src={WORLDOFWARCRAFT_ICON} /></a>
              <a
                className="Character-specIcon"
                title="View on WowProgress"
                target="_blank"
                ref="noopener noreferrer"
                href={WOWPROGRESS_CHAR
                  .replace(':region', 'us')
                  .replace(':realm', getSlug(character.realm))
                  .replace(':characterName', character.name)
              }><img src={WOWPROGRESS_ICON} /></a>
              <span className="Character-specName">{character.level} {character.name}</span>
            </p>
            <Class className="Character-class" characterClass={characterClass} />
            <Specialization
              className="Character-spec"
              spec={character.talents[0] && character.talents[0].spec}
              comparedTo={comparedTo && comparedTo.talents && comparedTo.talents[0] && comparedTo.talents[0].spec}
            />
            <Spacer />

            <Collapsable title="Item level">
              <ItemLevel
                items={character.items}
                comparedTo={comparedTo && comparedTo.items}
                hideLabels={isRival}
              />
            </Collapsable>

            <Collapsable title="Attributes">
              <MainAttributes
                stats={character.stats}
                comparedTo={comparedTo && comparedTo.stats}
                hideLabels={isRival}
              />
            </Collapsable>

            <Collapsable title="Enhacements">
              <SecondaryAttributes
                spec={character.talents[0].spec}
                stats={character.stats}
                comparedTo={comparedTo && comparedTo.stats}
                comparedToSpec={comparedTo && comparedTo.talents[0].spec}
                hideLabels={isRival}
              />
            </Collapsable>

            <Collapsable title="Deffense">
              <DeffenseAttributes
                stats={character.stats}
                comparedTo={comparedTo && comparedTo.stats}
                hideLabels={isRival}
              />
            </Collapsable>

            <Collapsable title="Talents">
              <Talents
                spec={character.talents[0] && character.talents[0].spec}
                availableTalents={availableTalents}
                usedTalents={character.talents[0]}
                comparedTo={comparedTo && comparedTo.talents[0]}
              />
            </Collapsable>
          </div>
        }
      </div>
    )
  }
};