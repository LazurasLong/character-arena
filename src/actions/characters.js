import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
  SWITCH_CHARACTER,
  MOVE_CHARACTER,
  REMOVE_CHARACTER,
} from '../constants/actionTypes.js';

import {
  CHARACTER,
} from '../constants/apiRoutes.js';

import { CALL_API } from '../middlewares/api';

import { composeUrl } from '../utils/calcs.js';

const defaultRealm = '';
const defaultCharacterName = '';
const defaultFields = ['items','stats', 'talents'];

const fetchCharacter = ({
  region,
  language,
  realm = defaultRealm,
  characterName = defaultCharacterName,
  fields = defaultFields,
}, avoidCache) => {
  return {
    [CALL_API]: {
      endpoint: `${composeUrl({
        url: CHARACTER,
        region,
        language,
        character: { realm, characterName },
        fields,
      })}${avoidCache ? `&t=${ new Date().getTime() }` : ''}`,
      types: [
        FETCH_CHARACTER_REQUEST,
        FETCH_CHARACTER_SUCCESS,
        FETCH_CHARACTER_ERROR,
      ],
      extra: {
        realm,
        name: characterName,
      }
    },
  };
};

const switchCharacter = ({
  realm,
  name,
}) => {
  return {
    type: SWITCH_CHARACTER,
    extra: {
      realm,
      name,
    },
  };
};

const moveCharacter = ({
  realm,
  name,
}, movement) => {
  return {
    type: MOVE_CHARACTER,
    extra: {
      realm,
      name,
      movement,
    },
  };
};

const removeCharacter = ({
  realm,
  name,
}) => {
  return {
    type: REMOVE_CHARACTER,
    extra: {
      realm,
      name,
    },
  };
};

export {
  fetchCharacter,
  switchCharacter,
  moveCharacter,
  removeCharacter,
};
