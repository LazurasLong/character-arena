import { HOME } from '../constants/appRoutes.js';
import { REGIONS } from '../constants/app.js';

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
export const getSlug = (name, useDashes) => name
  .replace(/\ /g, '')
  .replace(/'/g, `${useDashes ? '-' : ''}`)
  .replace(/-/g, `${useDashes ? '-' : ''}`)
  .toLowerCase();

// Given a word, normalize it (lowercase, accents, spaces, etc)
export const normalize = word => {
  const aes = /[àÀáÁâÂãÃäÄÅå]/g;
  const ees = /[èÈéÉêÊëË]/g;
  const ies = /[ìÌíÍîÎïÏ]/g;
  const oes = /[òÒóÓôÔõÕöÖØø]/g;
  const ues = /[ùÙúÚûÛüÜ]/g;
  
  return getSlug(word)
    .replace(aes, 'a')
    .replace(ees, 'e')
    .replace(ies, 'i')
    .replace(oes, 'o')
    .replace(ues, 'u');
};

const getRegionLanguage = ({
  region,
  language,
}) => {
  return REGIONS.find(r => r.slug === region)
    && REGIONS.find(r => r.slug === region).languages.find(l => l.slug === language)
    && REGIONS.find(r => r.slug === region).languages.find(l => l.slug === language).regionLanguage;
};

export const fillUrlData = ({
  url,
  region,
  language,
  realm,
  characterName,
  iconName,
  regionLanguage,
}) => {
  const regLang = regionLanguage || getRegionLanguage({ region, language });

  return url
    .replace(/:regionLanguage/g, regLang || region)
    .replace(/:language/g, language)
    .replace(/:region/g, region)
    .replace(/:realm/g, realm)
    .replace(/:characterName/g, characterName)
    .replace(/:iconName/g, iconName);
};

// Given a URL and some data, will replace variables on the URL
export const composeUrl = ({
  url,
  character,
  fields,
  region,
  language,
  regionLanguage,
}) => {
  const constructedURL = fields
    ? `${url}?locale=:language_:region&fields=${fields.map(f => `${f}`)}`
    : `${url}?locale=:language_:region`;

  return fillUrlData({
    url: constructedURL,
    regionLanguage,
    language,
    region,
    realm: character && character.realm,
    characterName: character && character.characterName,
  });
};

// Given a collection of characters, compose a valid pathname for the App
export const composePathname = ({
  region,
  language,
  regionLanguage,
  collection
}) => {
  let pathname = HOME
    .replace(':regionLanguage', regionLanguage)
    .replace(':language', language)
    .replace(':region', region)
    .replace('(', '')
    .replace(')', '')
    .concat('/');

  if (typeof collection !== 'undefined') {
    collection.forEach(char => {
      pathname = `${pathname}${char.realm}-${char.name},`;
    });
  }

  return pathname;
};

// Given a URL pattern, create a regexp
export const composeUrlPattern = (url) => {
  const pattern = fillUrlData({
    url: url,
    regionLanguage: '(.*)',
    language: '(.*)',
    region: '(.*)',
    realm: '(.*)',
    characterName: '(.*)',
    iconName: '(.*)',
  });

  return new RegExp(pattern);
};

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
