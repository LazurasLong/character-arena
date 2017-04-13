import createConnection from '../api/connection.js';

export const CALL_API = 'CALL_API';

export default store => next => action => {
  const callApi = action[CALL_API];
  if (!callApi) {
    return next(action);
  }

  const {
    endpoint,
    method = 'get',
    parameters = {},
    extra = {},
    types,
  } = callApi;

  const [requestType, successType, failureType] = types;

  // Allow me to send data from actions to reducers
  const requestAction = () => {
    return {
      type: requestType,
      payload: { ...extra },
    };
  };

  // Send fetched data into payload key
  const successAction = (response) => {
    let payload = { data: response, ...extra };

    return { type: successType, payload };
  };

  // Send error actionType
  const failureAction = error => {
    return {
      type: failureType,
      payload: {
        error,
        ...extra,
      },
    };
  };

  // Dispatch REQUEST
  next(requestAction());

  return createConnection()[method.toLowerCase()](endpoint, parameters)
    .then(json => { // Dispatch SUCCESS
      next(successAction(json));

      return Promise.resolve(json);
    })
    .catch(error => { // Dispatch FAILURE
      next(failureAction(error));

      return Promise.reject(error);
    })
  ;
};
