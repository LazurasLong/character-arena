import React from 'react';

import { BLIZZARD_ICONS } from '../constants/app.js';

const CharacterActions = ({
  character,
  handleSwitchCharacter,
  handleRemoveCharacter,
}) => (
  <div className="Character-actions">
    {/* Switch character */}
    <button
      title="Compare all characters with this character"
      className="Button Button--icon Button--invisible"
      onClick={() => { handleSwitchCharacter({ character }); }}
    >
      <svg
        className="Button-icon"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/2000/xlink"
        viewBox="0 0 64 64"
      >
        <use xlinkHref={`${BLIZZARD_ICONS}focus`} />
      </svg>
    </button>

    {/* Remove character */}
    <button
      title="Remove this character from list"
      className="Button Button--icon Button--invisible"
      onClick={() => { handleRemoveCharacter({ character }); }}
    >
      <svg
        className="Button-icon"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/2000/xlink"
        viewBox="0 0 64 64"
      >
        <use xlinkHref={`${BLIZZARD_ICONS}close`} />
      </svg>
    </button>
  </div>
);

CharacterActions.displayName = 'CharacterActions';

export default CharacterActions;