import React from 'react';
import { getSlug } from '../utils/calcs.js';

import { WOWPROGRESS_CHAR, WOWPROGRESS_ICON, WORLDOFWARCRAFT_ARMORY, WORLDOFWARCRAFT_ICON } from '../constants/app.js';

import CharacterAvatar from '../components/CharacterAvatar.jsx';
import CharacterClass from '../components/CharacterClass.jsx';
import CharacterSpec from '../components/CharacterSpec.jsx';

const CharacterHeader = ({
  character,
  comparedTo,
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
    <div className="Character-spec">
      <a
        className="Character-specIcon"
        title="View on World of Warcraft armory"
        target="_blank"
        rel="noopener noreferrer"
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
        rel="noopener noreferrer"
        href={WOWPROGRESS_CHAR
          .replace(':region', 'us')
          .replace(':realm', getSlug(character.realm))
          .replace(':characterName', character.name)
      }><img src={WOWPROGRESS_ICON} /></a>
    </div>
  </div>
);

export default CharacterHeader;