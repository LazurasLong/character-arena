import {
  FETCH_RACES_REQUEST,
  FETCH_RACES_SUCCESS,
  FETCH_RACES_ERROR,
  FETCH_CLASSES_REQUEST,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_ERROR,
  FETCH_REALMS_REQUEST,
  FETCH_REALMS_SUCCESS,
  FETCH_REALMS_ERROR,
  FETCH_TALENTS_REQUEST,
  FETCH_TALENTS_SUCCESS,
  FETCH_TALENTS_ERROR,
} from '../constants/actionTypes.js';

import {
  DATA_RACES,
  DATA_CLASSES,
  DATA_REALMS,
  DATA_TALENTS,
} from '../constants/apiRoutes.js';

import { CALL_API } from '../middlewares/api';

const fetchRaces = () => {
  return {
    [CALL_API]: {
      endpoint: DATA_RACES,
      types: [
        FETCH_RACES_REQUEST,
        FETCH_RACES_SUCCESS,
        FETCH_RACES_ERROR,
      ],
    },
  };
};

const fetchClasses = () => {
  return {
    [CALL_API]: {
      endpoint: DATA_CLASSES,
      types: [
        FETCH_CLASSES_REQUEST,
        FETCH_CLASSES_SUCCESS,
        FETCH_CLASSES_ERROR,
      ],
    },
  };
};

const fetchRealms = () => {
  return {
    [CALL_API]: {
      endpoint: DATA_REALMS,
      types: [
        FETCH_REALMS_REQUEST,
        FETCH_REALMS_SUCCESS,
        FETCH_REALMS_ERROR,
      ],
    },
  };
};

const fetchTalents = () => {
  return {
    [CALL_API]: {
      endpoint: DATA_TALENTS,
      types: [
        FETCH_TALENTS_REQUEST,
        FETCH_TALENTS_SUCCESS,
        FETCH_TALENTS_ERROR,
      ],
    },
  };
};

export {
  fetchRaces,
  fetchClasses,
  fetchRealms,
  fetchTalents,
};
