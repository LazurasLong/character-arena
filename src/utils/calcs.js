import { HOME } from '../constants/appRoutes.js';

/*
  CHARACTER RELATED
*/
// Find character's race
export const getCharacterRace = ({
  raceId,
  races,
}) => {
  const selectedRace = races.find(r => r.id === raceId);

  return selectedRace || raceId;
};

// Find character's class
export const getCharacterClass = ({
  classId,
  classes,
}) => {
  const selectedClass = classes.find(c => c.id === classId);
  if (selectedClass) {
    selectedClass.slug =  getSlug(selectedClass.name);
  }

  return selectedClass || classId;
};

// Find available talents for a given class
export const getAvailableTalents = ({
  classId,
  talents,
}) => {
  const selectedTalents = talents[classId];

  return selectedTalents;
};

/*
  ATTRIBUTES RELATED
*/
// Given 2 resources and a key, compare and get numeric difference
// between data with the same key in each object
export const compare = ({
  base,
  comparedTo,
  key,
}) => {
  if (
    typeof base !== 'undefined'
    && typeof base[key] !== 'undefined'
    && typeof comparedTo !== 'undefined'
    && typeof comparedTo[key] !== 'undefined'
  ) {
    return parseInt(base[key] - comparedTo[key]);
  }

  return undefined;
};

/*
  URL RELATED
*/
// Given a name, it'll return a url-friendly slug
export const getSlug = name => name
  .replace(' ', '')
  .replace("'", '')
  .replace("-", '')
  .toLowerCase();

// Given a URL and some data, will replace variables on the URL
export const composeUrl = ({
  url,
  character,
  fields,
  region,
  language,
}) => {
  const constructedURL = fields
    ? `${url}?locale=:language_:region&fields=${fields.map(f => `${f}`)}`
    : `${url}?locale=:language_:region`;

  return constructedURL
    .replace(/:region/g, region)
    .replace(/:language/g, language)
    .replace(/:realm/g, character && character.realm)
    .replace(/:characterName/g, character && character.characterName);
};

export const composePathname = ({
  region,
  language,
  collection
}) => {
  let pathname = HOME
    .replace(':region', region)
    .replace(':language', language)
    .replace('(', '')
    .replace(')', '')
    .concat('/');

  collection && collection.forEach(char => {
    pathname = `${pathname}${char.realm}-${char.name},`;
  });

  return pathname;
}

/*
  COOKIES RELATED
*/
// Get cookie value
export const getCookie = (name) => {
  const cookies = typeof document !== 'undefined'
    ? document.cookie.split(';')
    : [];
  const cookie = cookies.find(c => new RegExp(name).test(c));

  return cookie && cookie.split('=')[1];
}

// Set a cookie
export const setCookie = ({ name, value }) => {
  const maxAge = 63072000; // = 60s * 60m * 24h * 365d * 2y
  const expires = new Date(Date.now() + maxAge * 1000).toString();

  document.cookie = `${name}=${value}; expires=${expires}`;
}
