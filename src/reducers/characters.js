import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
  SWITCH_CHARACTER,
  MOVE_CHARACTER,
  REMOVE_CHARACTER,
} from '../constants/actionTypes.js';

import { getSlug } from '../utils/calcs.js'

const isTheSameCharacter = (original, compared) => {
  const result = (original.name.toLowerCase() === compared.name.toLowerCase() && getSlug({name: original.realm}) === getSlug({name: compared.realm}));

  return result;
};

const isInCollection = (collection, character) => {
  const result = collection.findIndex(char => isTheSameCharacter(char, character));

  return result;
}

const character = (state, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      if (action.payload && isTheSameCharacter(state, action.payload)) {
        return {
          ...state,
          isFetching: true,
          error: undefined,
        };
      }

      return state;

    case FETCH_CHARACTER_SUCCESS:
      if (action.payload && action.payload.data && isTheSameCharacter(state, action.payload.data)) {
        return {
          ...state,
          ...action.payload.data,
          isFetching: false,
        };
      }

      return state;

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
        collection: isInCollection(state.collection, action.payload) >= 0
          ? [...state.collection.map(char => character(char, action))]
          : [...state.collection, {...action.payload, isFetching: true}],
      };

    case FETCH_CHARACTER_SUCCESS:
      return {
        collection: isInCollection(state.collection, action.payload.data) >= 0
          ? [...state.collection.map(char => character(char, action))]
          : [...state.collection, {...action.payload.data, isFetching: false}],
      };

    case FETCH_CHARACTER_ERROR:
      return {
        collection: [
          ...state.collection.filter(char => (char.name !== action.payload.name || char.realm !== action.payload.realm)),
        ],
        error: action.payload.error,
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

    case MOVE_CHARACTER:
      // Create a new collection
      const newCollection = [...state.collection];

      // Get selected character's position
      const selectedCharacterIndex = state.collection.findIndex(char => isTheSameCharacter(char, action.extra));

      // Move selected character to selected position
      newCollection[selectedCharacterIndex + action.extra.movement] = state.collection[selectedCharacterIndex];

      // Move character located in selected position to previous selected character's position
      newCollection[selectedCharacterIndex] = state.collection[selectedCharacterIndex + action.extra.movement];

      return {
        ...state,
        collection: [
          ...newCollection,
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
