import React from 'react';
import { fillUrlData } from '../utils/calcs.js';

import { TALENT_ICON } from '../constants/app.js';

const CharacterTalentsIcon = ({ icon, description }) => icon
  ? (
    <img
      alt="Talent icon"
      className="CharacterTalents-talentIcon"
      src={fillUrlData({
        url: TALENT_ICON,
        iconName: icon
      })}
      title={description}
    />
  )
  : <div />;
CharacterTalentsIcon.displayName = 'CharacterTalentsIcon';

export default CharacterTalentsIcon;
