import axios from 'axios';

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

import { WOWPROGRESS_CHAR } from '../constants/app.js';

import { CALL_API } from '../middlewares/api';

import { composeUrl, fillUrlData, getSlug } from '../utils/calcs.js';

const defaultRealm = '';
const defaultCharacterName = '';
const defaultFields = ['guild', 'items','stats', 'talents'];

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

const fetchCharacterSimDPS = ({
  region,
  character,
}) => {
  return (dispatch) => {
    const options = {};

    const URL = fillUrlData({
      url: WOWPROGRESS_CHAR,
      region: region,
      realm: getSlug({name: character.realm, useDashes: true}),
      characterName: character.name,
    });

    return axios
      .get(
        URL,
        {},
        options,
      )
      .then(({ data }) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/xml");
        console.log('Success', doc, typeof doc);
        // console.log('Success', response.getElementById('simdps_score'));
        
        return Promise.resolve();
        // return dispatch(updateCharacterDPS({
        //   realm,
        //   characterName,
        //   data,
        // }));
      })
      .catch((errors) => {
        console.log('Error', errors);
        return Promise.reject();
      });
  };
};

export {
  fetchCharacter,
  switchCharacter,
  moveCharacter,
  removeCharacter,
  fetchCharacterSimDPS,
};
