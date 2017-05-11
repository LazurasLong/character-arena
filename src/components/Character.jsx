import React, { PropTypes, Component } from 'react';

import Select from '../components/inputs/Select.jsx';
import Input from '../components/inputs/Input.jsx';
import Loading from '../components/Loading.jsx';
import Error from '../components/inputs/Error.jsx';
import Spacer from '../components/Spacer.jsx';
import Collapsable from '../components/Collapsable.jsx';

import CharacterActions from '../components/CharacterActions.jsx';
import CharacterHeader from '../components/CharacterHeader.jsx';
import CharacterAttributesGroup from '../components/CharacterAttributesGroup.jsx';
import CharacterTalents from '../components/CharacterTalents.jsx';

export default class Character extends Component {
  static propTypes = {
    /* Required props */
    sections: PropTypes.object.isRequired,
    region: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    handleToggleCollapsable: PropTypes.func.isRequired,
    isFirst: PropTypes.bool.isRequired,
    isLast: PropTypes.bool.isRequired,

    /* Optional props */
    handleSwitchCharacter: PropTypes.func.isRequired,
    handleMoveCharacter: PropTypes.func.isRequired,
    handleRefreshCharacter: PropTypes.func.isRequired,
    handleRemoveCharacter: PropTypes.func.isRequired,

    /* Maybe-Undefined props */
    character: PropTypes.shape({
      name: PropTypes.string.isRequired,
      realm: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      race: PropTypes.object,
      class: PropTypes.object,
      items: PropTypes.object,
      stats: PropTypes.object,
      talents: PropTypes.array,
      availableTalents: PropTypes.object,
    }).isRequired,
    comparedTo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      race: PropTypes.object.isRequired,
      class: PropTypes.object.isRequired,
      items: PropTypes.object.isRequired,
      stats: PropTypes.object.isRequired,
      talents: PropTypes.array.isRequired,
      availableTalents: PropTypes.object.isRequired,
    }),
  };

  static displayName = 'Character';

  render() {
    const {
      sections,
      region,
      language,
      handleToggleCollapsable,

      handleSwitchCharacter,
      handleMoveCharacter,
      handleRefreshCharacter,
      handleRemoveCharacter,

      character,
      comparedTo,
      isFirst,
      isLast,
    } = this.props;

    const that = this;

    return (
      <div className={`Character ${character.race ? `is-${character.race.side}` : ''}`}>
        {/* Loading character */}
        {character && character.isFetching &&
          <Loading />
        }

        {/* Handle error */}
        {character && character.error &&
          <Error error={character.error} />
        }

        {/* Character info */}
        {character && !character.isFetching && !character.error &&
          <div className="Character-data">
            <CharacterActions
              character={character}
              handleSwitchCharacter={handleSwitchCharacter}
              handleMoveCharacter={handleMoveCharacter}
              handleRefreshCharacter={handleRefreshCharacter}
              handleRemoveCharacter={handleRemoveCharacter}
              isMain={!comparedTo}
              isFirst={isFirst}
              isLast={isLast}
            />

            <CharacterHeader
              character={character}
              comparedTo={comparedTo}
              region={region}
              language={language}
            />

            {/* Loop through different sections */}
            {Object.keys(sections).map((key) => {
              const section = sections[key];

              /* If there are no elements, return null */
              if (!section.elements) {
                return;
              }

              let characterData = {};
              let comparedToData = {};
              switch (key) {
                case 'attributes':
                  characterData = {
                    ...character.items,
                    ...character.stats,
                  };
                  comparedToData = comparedTo
                    ? {
                      ...comparedTo.items,
                      ...comparedTo.stats,
                    }
                    : undefined;
                  break;
                
                default:
                  characterData = character.stats;
                  comparedToData = comparedTo && comparedTo.stats;
                  break;
              }

              characterData.role = character.talents[0].spec.role;
              if (comparedToData) {
                comparedToData.role = comparedTo.talents[0].spec.role;
              }

              /* Return collapsable section */
              return (
                <Collapsable
                  key={`section-${section.slug}`}
                  data={section}
                  ref={(ref) => { that[section.slug] = ref; }}
                  handleToggleCollapsable={handleToggleCollapsable}
                >
                  <CharacterAttributesGroup
                    elements={section.elements}
                    data={characterData}
                    spec={comparedTo
                      ? comparedTo.talents[0].spec.backgroundImage
                      : character.talents[0].spec.backgroundImage
                    }
                    comparedTo={comparedToData}
                    hideLabels={typeof comparedToData !== 'undefined'}
                  />
                </Collapsable>
              );
            })}

            {/* Talents */}
            <Collapsable
              data={sections.talents}
              ref={(ref) => { this.talents = ref; }}
              handleToggleCollapsable={handleToggleCollapsable}
            >
              <CharacterTalents
                spec={character.talents[0] && character.talents[0].spec}
                availableTalents={character.availableTalents}
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
