import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
  SWITCH_CHARACTER,
  REMOVE_CHARACTER,
} from '../constants/actionTypes.js';

const isTheSameCharacter = (original, compared) => {
  const result = (original.name === compared.name && original.realm === compared.realm);
  
  return result;
};

const isInCollection = (collection, character) => {
  const result = collection.findIndex(char => isTheSameCharacter(char, character));
  return result;
}

const character = (state, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_SUCCESS:
      if (isTheSameCharacter(state, action.payload.data)) {
        return {
          ...action.payload.data,
        };
      }
      return state;

    default:
      return state;
  }
};

const initialState = {
  collection: [],
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };

    case FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        collection: isInCollection(state.collection, action.payload.data) >= 0
          ? [...state.collection.map(char => character(char, action))]
          : [...state.collection, {...action.payload.data}],
        isFetching: false,
        error: undefined,
      };
    
    case FETCH_CHARACTER_ERROR:
      return {
        ...state,
        isFetching: false,
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
