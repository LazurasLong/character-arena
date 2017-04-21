import React from 'react';
import { fillUrlData } from '../utils/calcs.js';

import { TALENT_ICON } from '../constants/app.js';

const CharacterSpecIcon = ({ icon }) => icon
  ? (
    <img
      alt={`Specialization icon`}
      className="Character-specIcon"
      src={fillUrlData({
        url: TALENT_ICON,
        iconName: icon
      })}
    />
  )
  : <div />;
CharacterSpecIcon.displayName = 'CharacterSpecIcon';

export default CharacterSpecIcon;
