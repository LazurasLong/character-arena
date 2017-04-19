import React from 'react';
import { SPEC_ICONS } from '../constants/app.js';

const CharacterSpecIcon = ({ icon }) => icon
  ? (
    <img
      alt={`Specialization icon`}
      className="Character-specIcon"
      src={SPEC_ICONS.replace(':iconName', icon)}
    />
  )
  : <div />;
CharacterSpecIcon.displayName = 'CharacterSpecIcon';

export default CharacterSpecIcon;
