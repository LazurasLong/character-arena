import React from 'react';
import { TALENT_ICON } from '../constants/app.js';

const CharacterTalentsIcon = ({ icon, description }) => icon ? (
  <img
    className="Talents-talentIcon"
    src={TALENT_ICON.replace(':iconName', icon)}
    title={description}
  />) : <div />;
CharacterTalentsIcon.displayName = 'CharacterTalentsIcon';

export default CharacterTalentsIcon;
