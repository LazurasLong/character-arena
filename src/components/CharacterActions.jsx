import React from 'react';

import Icon from '../components/Icon.jsx';

const CharacterActions = ({
  character,
  handleSwitchCharacter,
  handleRefreshCharacter,
  handleRemoveCharacter,
  isMain,
  isFirst,
  isLast,
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

    {/* Move left */}
    {!isMain && !isFirst &&
      <button
        title="Move this character to left"
        className="Button Button--icon Button--invisible"
      >
        <Icon className="Button-icon" icon="leftarrow" />
      </button>
    }

    {/* Move right */}
    {!isMain && !isLast &&
      <button
        title="Move this character to right"
        className="Button Button--icon Button--invisible"
      >
        <Icon className="Button-icon" icon="rightarrow" />
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