import React, { PropTypes, Component } from 'react';
import { getSlug } from '../utils/calcs.js';

import Select from '../components/inputs/Select.jsx';
import Input from '../components/inputs/Input.jsx';
import Loading from '../components/Loading.jsx';
import Error from '../components/inputs/Error.jsx';
import Spacer from '../components/Spacer.jsx';
import Collapsable from '../components/Collapsable.jsx';

import CharacterHeader from '../components/CharacterHeader.jsx';
import CharacterAttrsItems from '../components/CharacterAttrsItems.jsx';
import CharacterAttrsMain from '../components/CharacterAttrsMain.jsx';
import CharacterAttrsSecondaries from '../components/CharacterAttrsSecondaries.jsx';
import CharacterAttrsDeffense from '../components/CharacterAttrsDeffense.jsx';
import CharacterTalents from '../components/CharacterTalents.jsx';

export default class CharacterFrame extends Component {
  static propTypes = {
    /* Required props */
    sections: PropTypes.object.isRequired,
    handleToggleCollapsable: PropTypes.func.isRequired,
    handleFetchCharacter: PropTypes.func.isRequired,

    /* Optional props */
    availableRealms: PropTypes.array,
    classes: PropTypes.array,
    races: PropTypes.array,
    talents: PropTypes.object,
    title: PropTypes.string,

    /* Maybe-Undefined props */
    character: PropTypes.shape({
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      race: PropTypes.number,
      class: PropTypes.number,
      items: PropTypes.object,
      stats: PropTypes.object,
    }),
    comparedTo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      race: PropTypes.number.isRequired,
      class: PropTypes.number.isRequired,
      items: PropTypes.object.isRequired,
      stats: PropTypes.object.isRequired,
    }),
  };

  static defaultProps = {
    availableRealms: [],
    classes: [],
    races: [],
    talents: {},
    title: 'New character',
  };

  static displayName = 'Character';

  render() {
    const {
      sections,
      handleToggleCollapsable,
      handleFetchCharacter,

      availableRealms,
      classes,
      races,
      talents,
      title,

      character,
      comparedTo,
    } = this.props;

    /* If there is no character */
    // TODO: Abstract this to a new component (CharacterFinder.jsx)
    if (!character) {
      return (
        <div className={`Character ${characterRace ? `is-${characterRace.side}` : ''}`}>
          
          {/* Filters */}
          <Collapsable
            title={title}
            slug="filters"
            data={sections.filters}
            ref={(ref) => { this.filters = ref; }}
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
            </div>
          </Collapsable>
        </div>
      );
    }

    // Get character class and talents
    const classIndex = classes.findIndex(c => c.id === character.class);
    let characterClass;
    let characterRace;
    let availableTalents;

    if (classIndex >= 0) {
      characterClass = classes[classIndex];
      characterRace = races.find(r => r.id === character.race);
      availableTalents = talents[classIndex + 1];
      characterClass.slug = getSlug(characterClass.name);
    }

    return (
      <div className={`Character ${characterRace ? `is-${characterRace.side}` : ''}`}>        
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
          <div className="Character-data">
            <CharacterHeader
              character={character}
              characterRace={characterRace}
              characterClass={characterClass}
              comparedTo={comparedTo}
            />

            {/* Item level */}
            <Collapsable
              title="Item level"
              slug="itemLevel"
              data={sections.itemLevel}
              ref={(ref) => { this.itemLevel = ref; }}
              handleToggleCollapsable={handleToggleCollapsable}
            >
              <CharacterAttrsItems
                items={character.items}
                comparedTo={comparedTo && comparedTo.items}
                hideLabels={!!comparedTo}
              />
            </Collapsable>

            {/* Main attributes */}
            <Collapsable
              title="Attributes"
              slug="attributes"
              data={sections.attributes}
              ref={(ref) => { this.attributes = ref; }}
              handleToggleCollapsable={handleToggleCollapsable}
            >
              <CharacterAttrsMain
                stats={character.stats}
                comparedTo={comparedTo && comparedTo.stats}
                hideLabels={!!comparedTo}
              />
            </Collapsable>

            {/* Secondary attributes */}
            <Collapsable
              title="Enhacements"
              slug="enhacements"
              data={sections.enhacements}
              ref={(ref) => { this.enhacements = ref; }}
              handleToggleCollapsable={handleToggleCollapsable}
            >
              <CharacterAttrsSecondaries
                spec={character.talents[0].spec}
                stats={character.stats}
                comparedTo={comparedTo && comparedTo.stats}
                comparedToSpec={comparedTo && comparedTo.talents[0].spec}
                hideLabels={!!comparedTo}
              />
            </Collapsable>

            {/* Deffense */}
            <Collapsable
              title="Deffense"
              slug="deffense"
              data={sections.deffense}
              ref={(ref) => { this.deffense = ref; }}
              handleToggleCollapsable={handleToggleCollapsable}
            >
              <CharacterAttrsDeffense
                stats={character.stats}
                comparedTo={comparedTo && comparedTo.stats}
                hideLabels={!!comparedTo}
              />
            </Collapsable>

            {/* Talents */}
            <Collapsable
              title="Talents"
              slug="talents"
              data={sections.talents}
              ref={(ref) => { this.talents = ref; }}
              handleToggleCollapsable={handleToggleCollapsable}
            >
              <CharacterTalents
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