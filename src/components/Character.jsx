import React, { PropTypes, Component } from 'react';

import Select from '../components/inputs/Select.jsx';
import Input from '../components/inputs/Input.jsx';
import Loading from '../components/Loading.jsx';
import Error from '../components/inputs/Error.jsx';
import Spacer from '../components/Spacer.jsx';
import Collapsable from '../components/Collapsable.jsx';

import CharacterActions from '../components/CharacterActions.jsx';
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
    region: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    handleToggleCollapsable: PropTypes.func.isRequired,

    /* Optional props */
    handleSwitchCharacter: PropTypes.func,
    handleRemoveCharacter: PropTypes.func,

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

      handleFetchCharacter,
      handleSwitchCharacter,
      handleRemoveCharacter,

      character,
      comparedTo,
    } = this.props;

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
              handleRemoveCharacter={handleRemoveCharacter}
              isMain={!comparedTo}
            />

            <CharacterHeader
              character={character}
              comparedTo={comparedTo}
              region={region}
              language={language}
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
