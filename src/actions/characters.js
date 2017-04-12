import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
  FETCH_RIVAL_REQUEST,
  FETCH_RIVAL_SUCCESS,
  FETCH_RIVAL_ERROR,
} from '../constants/actionTypes.js';

import { CALL_API } from '../middlewares/api';

const fetchCharacter = () => {
  return {
    [CALL_API]: {
      endpoint: `http://localhost:4000/members`,
      types: [
        FETCH_CHARACTER_REQUEST,
        FETCH_CHARACTER_SUCCESS,
        FETCH_CHARACTER_ERROR,
      ],
    },
  };
};

const fetchRival = params => {
  return {
    [CALL_API]: {
      endpoint: `http://localhost:4000/members`,
      types: [
        FETCH_MEMBER_REQUEST,
        FETCH_MEMBER_SUCCESS,
        FETCH_MEMBER_ERROR,
      ],
    },
  };
};

export {
  fetchMembers,
  sortMembers,
};
