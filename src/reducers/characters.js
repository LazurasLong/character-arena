import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
  FETCH_RIVAL_REQUEST,
  FETCH_RIVAL_SUCCESS,
  FETCH_RIVAL_ERROR,
} from '../constants/actionTypes.js';

const initialState = {
  character: {},
  rival: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        character: {
          ...state.character,
          isFetching: true,
        },
      };

    case FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        character: {
          ...state.character,
          ...action.payload.data,
          isFetching: false,
        },
      };
    
    case FETCH_CHARACTER_ERROR:
      return {
        ...state,
        character: {
          error: action.payload.error,
        },
      };
    case FETCH_RIVAL_REQUEST:
      return {
        ...state,
        rival: {
          ...state.rival,
          isFetching: true,
        },
      };

    case FETCH_RIVAL_SUCCESS:
      return {
        ...state,
        rival: {
          ...state.rival,
          ...action.payload.data,
          isFetching: false,
        },
      };
    
    case FETCH_RIVAL_ERROR:
      return {
        ...state,
        rival: {
          error: action.payload.error,
        },
      };

    default:
      return state;

  }
};
