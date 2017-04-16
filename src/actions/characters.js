import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
} from '../constants/actionTypes.js';

import {
  CHARACTER,
} from '../constants/apiRoutes.js';

import { CALL_API } from '../middlewares/api';

import { composeUrl } from '../utils/calcs.js';

const defaultRealm = '';
const defaultCharacterName = '';
const defaultFields = ['appearance', 'items','stats', 'talents'];

const fetchCharacter = ({
  region,
  language,
  realm = defaultRealm,
  characterName = defaultCharacterName,
  fields = defaultFields,
}) => {
  return {
    [CALL_API]: {
      endpoint: composeUrl({
        url: CHARACTER,
        region,
        language,
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

export {
  fetchCharacter,
};
