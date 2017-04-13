import React from 'react';
import { SPEC_ICONS } from '../constants/app.js';

const SpecIcon = ({ icon }) => icon ? <img className="Character-specIcon" src={SPEC_ICONS.replace(':iconName', icon)} /> : <div />;
SpecIcon.displayName = 'SpecIcon';

export default SpecIcon;
