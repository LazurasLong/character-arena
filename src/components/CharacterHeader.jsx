import React from 'react';
import { getSlug, fillUrlData, getRelativeTime } from '../utils/calcs.js';

import { WOWPROGRESS_CHAR, WOWPROGRESS_ICON, WORLDOFWARCRAFT_ARMORY } from '../constants/app.js';

import Icon from '../components/Icon.jsx';
import CharacterAppearance from '../components/CharacterAppearance.jsx';
import CharacterSpec from '../components/CharacterSpec.jsx';

const CharacterHeader = ({
  character,
  comparedTo,
  region,
  language,
}) => (
  <div className="Character-header">
    {/* Character avatar */}
    <CharacterAppearance
      picture={character.thumbnail}
      faction={character.race.side}
    />

    {/* Character name */}
    <span className={`Character-name color--${character.class.slug}`}>{character.name}</span>

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
      }>
        <Icon className="Character-linkIcon" icon="wow" />
      </a>
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
      }>
        <img alt="Link to WoWProgress.com" className="Character-linkIcon" src={WOWPROGRESS_ICON} />
      </a>
    </div>

    {/* Character class and spec */}
    <CharacterSpec
      className="Character-spec"
      level={character.level}
      characterClass={character.class}
      spec={character.talents[0] && character.talents[0].spec}
      comparedTo={comparedTo && comparedTo.talents && comparedTo.talents[0] && comparedTo.talents[0].spec}
    />

    {/* Last updated */}
    <p className="Character-lastUpdate">
      <span className="Character-lastUpdateLabel">Last update</span>
      {getRelativeTime(character.lastModified)}
    </p>
  </div>
);

export default CharacterHeader;