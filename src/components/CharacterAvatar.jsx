import React, { PropTypes } from 'react';

import imageResolver from '../utils/image-resolver.js';

import { AVATAR_URL } from '../constants/apiRoutes.js';
import { BLIZZARD_ICONS } from '../constants/app.js';

const CharacterAvatar = ({
  picture,
  faction,
}) => (
  <div className="CharacterAvatar">
    <div className="CharacterAvatar-wrapper">
      {picture &&
        <img
          alt="Character avatar"
          className="CharacterAvatar-picture"
          src={`${AVATAR_URL}${picture}`}
        />
      }
    </div>
    {faction.length > 0 &&
      <svg
        className={`CharacterAvatar-faction CharacterAvatar--${faction}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/2000/xlink"
        viewBox="0 0 64 64"
      >
        <use xlinkHref={`${imageResolver('../images/blizzard-icons.svg')}#${faction}`} />
      </svg>
    }
  </div>
);

CharacterAvatar.propTypes = {
  picture: PropTypes.string,
  faction: PropTypes.string,
};
CharacterAvatar.defaultProps = {
  faction: '',
};
CharacterAvatar.displayName = 'CharacterAvatar';

export default CharacterAvatar;