import React, { PropTypes } from 'react';
import imageResolver from '../utils/image-resolver.js';

import { AVATAR_URL } from '../constants/apiRoutes.js';

const CharacterAppearance = ({
  picture,
  faction,
}) => {
  const appearanceUrl = `${AVATAR_URL}${picture.replace('avatar', 'main')}`;

  return (
    <div
      className="Character-appearance"
      style={{backgroundImage: `url(${appearanceUrl})`}}
    >
      {faction === 'alliance' &&
        <img
          alt="Faction's logo"
          className="Character-factionLogo"
          src={imageResolver(`../images/logo-alliance.png`)}
        />
      }
      {faction === 'horde' &&
        <img
          alt="Faction's logo"
          className="Character-factionLogo"
          src={imageResolver(`../images/logo-horde.png`)}
        />
      }
    </div>
  )
};

CharacterAppearance.propTypes = {
  picture: PropTypes.string.isRequired,
  faction: PropTypes.string.isRequired,
};
CharacterAppearance.displayName = 'CharacterAppearance';

export default CharacterAppearance;