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

const initialState = {
  races: {
    collection: [],
    isFetching: false,
  },
  classes: {
    collection: [],
    isFetching: false,
  },
  realms: {
    collection: [],
    isFetching: false,
  },
  talents: {
    collection: [],
    isFetching: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RACES_REQUEST:
      return {
        ...state,
        races: {
          ...state.races,
          isFetching: true,
        },
      };

    case FETCH_RACES_SUCCESS:
      return {
        ...state,
        races: {
          ...state.races,
          collection: action.payload.data.races,
          isFetching: false,
        },
      };
    
    case FETCH_RACES_ERROR:
      return {
        ...state,
        races: {
          error: action.payload.error,
        },
      };

    case FETCH_CLASSES_REQUEST:
      return {
        ...state,
        classes: {
          ...state.classes,
          isFetching: true,
        },
      };

    case FETCH_CLASSES_SUCCESS:
      return {
        ...state,
        classes: {
          ...state.classes,
          collection: action.payload.data.classes.map(c => {
            let slug;

            switch(c.id) {
              case 1: slug = 'warrior'; break;
              case 2: slug = 'paladin'; break;
              case 3: slug = 'hunter'; break;
              case 4: slug = 'rogue'; break;
              case 5: slug = 'priest'; break;
              case 6: slug = 'death-knight'; break;
              case 7: slug = 'shaman'; break;
              case 8: slug = 'mage'; break;
              case 9: slug = 'warlock'; break;
              case 10: slug = 'monk'; break;
              case 11: slug = 'druid'; break;
              case 12: slug = 'demon-hunter'; break;
              default: slug = ''; break;
            }

            return {
              ...c,
              slug,
            };
          }),
          isFetching: false,
        },
      };
    
    case FETCH_CLASSES_ERROR:
      return {
        ...state,
        classes: {
          error: action.payload.error,
        },
      };

    case FETCH_REALMS_REQUEST:
      return {
        ...state,
        realms: {
          ...state.realms,
          isFetching: true,
        },
      };

    case FETCH_REALMS_SUCCESS:
      return {
        ...state,
        realms: {
          ...state.realms,
          collection: action.payload.data.realms,
          isFetching: false,
        },
      };
    
    case FETCH_REALMS_ERROR:
      return {
        ...state,
        realms: {
          error: action.payload.error,
        },
      };

    case FETCH_TALENTS_REQUEST:
      return {
        ...state,
        talents: {
          ...state.talents,
          isFetching: true,
        },
      };

    case FETCH_TALENTS_SUCCESS:
      return {
        ...state,
        talents: {
          ...state.talents,
          collection: action.payload.data,
          isFetching: false,
        },
      };
    
    case FETCH_TALENTS_ERROR:
      return {
        ...state,
        talents: {
          error: action.payload.error,
        },
      };

    default:
      return state;

  }
};
