import React from 'react';
import { TALENT_ICON } from '../constants/app.js';

const TalentIcon = ({ icon, description }) => icon ? (
  <img
    className="Talents-talentIcon"
    src={TALENT_ICON.replace(':iconName', icon)}
    title={description}
  />) : <div />;
TalentIcon.displayName = 'TalentIcon';

export default TalentIcon;
