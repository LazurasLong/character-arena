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

export const getSpecResource = ({
  powerType,
  role,
  resource,
  spec,
}) => {
  /* Strength */
  if (
    // Warrior
    (powerType === 'rage')
    // DK
    || (powerType === 'runic-power')
    // Pala tank
    || (spec === 'bg-paladin-protection')
    // Pala dps
    || (spec === 'bg-paladin-retribution')
  ) {
    if (resource === 'str') {
      return true;
    }
    return false;
  
  /* Agility */
  } else if (
    // Rogue, monks
    (powerType === 'energy')
    // Hunter
    || (powerType === 'focus')
    // DH dps
    || (powerType === 'fury')
    // DH tank
    || (powerType === 'pain')
    // Feral
    || (spec === 'bg-druid-cat')
    // Feral
    || (spec === 'bg-druid-guardian')
    // Shaman enhancement
    || (spec === 'bg-shaman-enhancement')
  ) {
    if (resource === 'agi') {
      return true;
    }
    return false;
  
  /* Intellect */
  } else if (
    // Healers
    (role === 'HEALER')
    // Mage, Priest, Warlock
    || (powerType === 'mana')
    // Shadow priest
    || (powerType === 'insanity')
    // Elemental shaman
    || (powerType === 'maelstrom')
  ) {
    if (resource === 'int') {
      return true;
    }
    return false;
  }

  return false;
}

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
  regionLanguage,
  language,
  region,
  realm,
  characterName,
  guild,
  iconName,
}) => {
  const regLang = regionLanguage || getRegionLanguage({ region, language });

  return url
    .replace(/:regionLanguage/g, regLang || region)
    .replace(/:language/g, language)
    .replace(/:region/g, region)
    .replace(/:realm/g, realm)
    .replace(/:characterName/g, characterName)
    .replace(/:guild/g, guild)
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

/*
  DATE AND NUMBERS RELATED
*/
// Get relative time
export const getRelativeTime = timestamp => {
    var now = new Date().getTime();

    // Get timeAgo time
    var timeAgo = now - timestamp;

    // Calc values
    var years = parseInt(timeAgo / 1000 / 60 / 60 / 24 / 30 / 12);
    var months = parseInt(timeAgo / 1000 / 60 / 60 / 24 / 30) - (years * 12);
    var days = parseInt(timeAgo / 1000 / 60 / 60 / 24) - (years * 12 * 30) - (months * 30);
    var hours = parseInt(timeAgo / 1000 / 60 / 60) - (years * 12 * 30 * 24) - (months * 30 * 24) - (days * 24);
    var mins = parseInt(timeAgo / 1000 / 60) - (years * 12 * 30 * 24 * 60) - (months * 30 * 24 * 60) - (days * 24 * 60) - (hours * 60);

    // Build the array
    var timming = [];
    if (years) timming.push(`${years} years`);
    if (months) timming.push(`${months} months`);
    if (days) timming.push(`${days} days`);
    if (hours) timming.push(`${hours} hours`);
    if (mins) timming.push(`${mins} mins`);

    // Return formatted string
    return timming.join(', ');
};

// Format a number with millions and thousand separators
export const formatIntegers = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
