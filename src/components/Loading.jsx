import React from 'react';

import CharacterAvatar from '../components/CharacterAvatar.jsx';

const Loading = () => (
  <div className="Character-header">

    <CharacterAvatar />

    <p className="Character-name">Loading...</p>
  </div>
);

export default Loading;