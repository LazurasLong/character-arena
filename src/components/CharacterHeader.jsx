import React from 'react';
import { getSlug, fillUrlData } from '../utils/calcs.js';

import { WOWPROGRESS_CHAR, WOWPROGRESS_ICON, WORLDOFWARCRAFT_ARMORY } from '../constants/app.js';

import Icon from '../components/Icon.jsx';
import CharacterAvatar from '../components/CharacterAvatar.jsx';
import CharacterClass from '../components/CharacterClass.jsx';
import CharacterSpec from '../components/CharacterSpec.jsx';

const CharacterHeader = ({
  character,
  comparedTo,
  region,
  language,
}) => (
  <div className="Character-header">
    {/* Character avatar */}
    <CharacterAvatar
      picture={character.thumbnail}
      faction={character.race.side}
    />

    {/* Character name */}
    <p className="Character-name">{character.level} {character.name}</p>

    {/* Character class */}
    <CharacterClass
      className="Character-class"
      characterClass={character.class}
    />

    {/* Character spec */}
    <CharacterSpec
      className="Character-spec"
      spec={character.talents[0] && character.talents[0].spec}
      comparedTo={comparedTo && comparedTo.talents && comparedTo.talents[0] && comparedTo.talents[0].spec}
    />

    {/* External links */}
    <div className="Character-links">
      <a
        className="Character-link"
        title="View on World of Warcraft armory"
        target="_blank"
        rel="noopener noreferrer"
        href={fillUrlData({
          url: WORLDOFWARCRAFT_ARMORY,
          region: region,
          language: language,
          realm: getSlug(character.realm),
          characterName: getSlug(character.name),
        })
      }><Icon className="Character-linkIcon" icon="wow" /></a>
      <a
        className="Character-link"
        title="View on WowProgress"
        target="_blank"
        rel="noopener noreferrer"
        href={fillUrlData({
          url: WOWPROGRESS_CHAR,
          region: region,
          realm: getSlug(character.realm, true),
          characterName: character.name,
        })
      }><img alt="Link to WoWProgress.com" className="Character-linkIcon" src={WOWPROGRESS_ICON} /></a>
    </div>
  </div>
);

export default CharacterHeader;