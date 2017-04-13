import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
  FETCH_RIVAL_REQUEST,
  FETCH_RIVAL_SUCCESS,
  FETCH_RIVAL_ERROR,
} from '../constants/actionTypes.js';

import {
  CHARACTER,
} from '../constants/apiRoutes.js';

import { CALL_API } from '../middlewares/api';

const defaultRealm = 'quel\'thalas';
const defaultCharacterName = 'Tamarán';
const defaultFields = ['appearance', 'items','stats', 'talents'];

const composeUrl = ({
  url,
  character,
  fields,
}) => {
  const parsedUrl = url
    .replace(':realm', character.realm)
    .replace(':characterName', character.characterName);

  return `${parsedUrl}?fields=${fields.map(f => `${f}`)}`
};

const fetchCharacter = ({
  realm = defaultRealm,
  characterName = defaultCharacterName,
  fields = defaultFields,
}) => {
  return {
    [CALL_API]: {
      endpoint: composeUrl({
        url: CHARACTER, 
        character: { realm, characterName },
        fields,
      }),
      types: [
        FETCH_CHARACTER_REQUEST,
        FETCH_CHARACTER_SUCCESS,
        FETCH_CHARACTER_ERROR,
      ],
    },
  };
};

const fetchRival = ({
  realm = defaultRealm,
  characterName = defaultCharacterName,
  fields = defaultFields,
}) => {
  return {
    [CALL_API]: {
      endpoint: composeUrl({
        url: CHARACTER, 
        character: { realm, characterName },
        fields,
      }),
      types: [
        FETCH_RIVAL_REQUEST,
        FETCH_RIVAL_SUCCESS,
        FETCH_RIVAL_ERROR,
      ],
    },
  };
};

export {
  fetchCharacter,
  fetchRival,
};
