import React from 'react';

import imageResolver from '../utils/image-resolver.js';

const CharacterActions = ({
  character,
  handleSwitchCharacter,
  handleRefreshCharacter,
  handleRemoveCharacter,
  isMain,
}) => (
  <div className="CharacterActions">
    {/* Switch character */}
    {!isMain &&
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
          <use xlinkHref={`${imageResolver('../images/blizzard-icons.svg')}#objective`} />
        </svg>
      </button>
    }

    {/* Refresh character */}
    <button
      title="Refresh character data"
      className="Button Button--icon Button--invisible"
      onClick={() => { handleRefreshCharacter({ character }); }}
    >
      <svg
        className="Button-icon"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/2000/xlink"
        viewBox="0 0 64 64"
      >
        <use xlinkHref={`${imageResolver('../images/blizzard-icons.svg')}#close`} />
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
        <use xlinkHref={`${imageResolver('../images/blizzard-icons.svg')}#close`} />
      </svg>
    </button>
  </div>
);

CharacterActions.displayName = 'CharacterActions';

export default CharacterActions;