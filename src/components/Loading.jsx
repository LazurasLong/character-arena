import React from 'react';
import imageResolver from '../utils/image-resolver.js';

import CharacterAvatar from '../components/CharacterAvatar.jsx';

const Loading = () => (
  <div className="Character-header">
    <img
      alt="Loading character placeholder"
      className="Character-placeholder"
      src={imageResolver('../images/favicons/android-chrome-192x192.png')}
    />
    <p className="Character-name">Loading fighter's data...</p>
  </div>
);

export default Loading;