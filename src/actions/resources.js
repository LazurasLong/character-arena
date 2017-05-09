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

import { composeUrl } from '../utils/calcs.js';

const defaultRegion = 'us';
const defaultLanguage = 'en';

const fetchRaces = ({
  region = defaultRegion,
  language = defaultLanguage,
}) => {
  return {
    [CALL_API]: {
      endpoint: composeUrl({
        url: DATA_RACES,
        region,
        language,
      }),
      types: [
        FETCH_RACES_REQUEST,
        FETCH_RACES_SUCCESS,
        FETCH_RACES_ERROR,
      ],
    },
  };
};

const fetchClasses = ({
  region = defaultRegion,
  language = defaultLanguage,
}) => {
  return {
    [CALL_API]: {
      endpoint: composeUrl({
        url: DATA_CLASSES,
        region,
        language,
      }),
      types: [
        FETCH_CLASSES_REQUEST,
        FETCH_CLASSES_SUCCESS,
        FETCH_CLASSES_ERROR,
      ],
    },
  };
};

const fetchRealms = ({
  region = defaultRegion,
  language = defaultLanguage,
}) => {
  return {
    [CALL_API]: {
      endpoint: composeUrl({
        url: DATA_REALMS,
        region,
        language,
      }),
      types: [
        FETCH_REALMS_REQUEST,
        FETCH_REALMS_SUCCESS,
        FETCH_REALMS_ERROR,
      ],
    },
  };
};

const fetchTalents = ({
  region = defaultRegion,
  language = defaultLanguage,
}) => {
  return {
    [CALL_API]: {
      endpoint: composeUrl({
        url: DATA_TALENTS,
        region,
        language,
      }),
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
