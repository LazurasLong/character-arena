import React, { PropTypes } from 'react';

import { AVATAR_URL } from '../constants/apiRoutes.js';
import { BLIZZARD_ICONS } from '../constants/app.js';

const CharacterAvatar = ({
  picture,
  faction,
}) => (
  <div className="Avatar">
    <div className="Avatar-wrapper">
      <img
        className="Avatar-picture"
        src={`${AVATAR_URL}${picture}`}
      />
    </div>
    {faction.length &&
      <svg
        className="Avatar-faction"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/2000/xlink"
        viewBox="0 0 64 64"
      >
        <use xlinkHref={`${BLIZZARD_ICONS}${faction}`} />
      </svg>
    }
  </div>
);

CharacterAvatar.propTypes = {
  picture: PropTypes.string.isRequired,
  faction: PropTypes.string,
};
CharacterAvatar.defaultProps = {
  faction: '',
};
CharacterAvatar.displayName = 'CharacterAvatar';

export default CharacterAvatar;