import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
  SWITCH_CHARACTER,
  REMOVE_CHARACTER,
} from '../constants/actionTypes.js';

import { getSlug } from '../utils/calcs.js'

const isTheSameCharacter = (original, compared) => {
  const result = (original.name === compared.name && getSlug(original.realm) === getSlug(compared.realm));

  return result;
};

const isInCollection = (collection, character) => {
  const result = collection.findIndex(char => isTheSameCharacter(char, character));

  return result;
}

const character = (state, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_SUCCESS:
      if (action.payload && action.payload.data && isTheSameCharacter(state, action.payload.data)) {
        return {
          ...state,
          ...action.payload.data,
          isFetching: false,
        };
      }

      return state;

    case FETCH_CHARACTER_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
      };

    default:
      return state;
  }
};

const initialState = {
  collection: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        collection: isInCollection(state.collection, action.payload) >= 0
          ? [...state.collection.map(char => character(char, action))]
          : [...state.collection, {...action.payload, isFetching: true}],
      };

    case FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        collection: isInCollection(state.collection, action.payload.data) >= 0
          ? [...state.collection.map(char => character(char, action))]
          : [...state.collection, {...action.payload.data, isFetching: false}],
      };

    case FETCH_CHARACTER_ERROR:
      return {
        ...state,
        collection: [
          ...state.collection.map(char => character(char, action))
        ],
      };

    case SWITCH_CHARACTER:
      return {
        ...state,
        collection: [
          state.collection.find(char => isTheSameCharacter(char, action.extra)),
          ...state.collection.slice(0, isInCollection(state.collection, action.extra)),
          ...state.collection.slice(isInCollection(state.collection, action.extra) + 1),
        ],
      }

    case REMOVE_CHARACTER:
      return {
        ...state,
        collection: [
          ...state.collection.slice(0, isInCollection(state.collection, action.extra)),
          ...state.collection.slice(isInCollection(state.collection, action.extra) + 1),
        ],
      }

    default:
      return state;

  }
};
