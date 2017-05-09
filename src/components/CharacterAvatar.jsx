import React, { PropTypes } from 'react';

import Icon from '../components/Icon.jsx';

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
      <Icon className={`CharacterAvatar-faction CharacterAvatar--${faction}`} icon={faction} />
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