import React from 'react';

import Icon from '../components/Icon.jsx';

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
        <Icon className="Button-icon" icon="favorite" />
      </button>
    }

    {/* Refresh character */}
    <button
      title="Refresh character data"
      className="Button Button--icon Button--invisible"
      onClick={() => { handleRefreshCharacter({ character }); }}
    >
      <Icon className="Button-icon" icon="clock" />
    </button>

    {/* Remove character */}
    <button
      title="Remove this character from list"
      className="Button Button--icon Button--invisible"
      onClick={() => { handleRemoveCharacter({ character }); }}
    >
      <Icon className="Button-icon" icon="close" />
    </button>
  </div>
);

CharacterActions.displayName = 'CharacterActions';

export default CharacterActions;