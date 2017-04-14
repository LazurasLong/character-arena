
// App data
export const TITLE = 'WoW Character Comparision';
export const SLUG = 'wow-character-comparision';
export const EMAIL = 'rafael.perez@imperdiblesoft.com';
export const URL = 'https://www.charactercomparision.com';
export const REGIONS = [
  {
    slug: 'us',
    name: 'America',
    languages: [
      { slug: 'en', name: 'English (US)' },
      { slug: 'es', name: 'Español (AL)' },
      { slug: 'pt', name: 'Português (AL)' },
    ]
  },
  {
    slug: 'eu',
    name: 'Europe',
    languages: [
      { slug: 'de', name: 'Deutsch' },
      { slug: 'en', name: 'English (EU)' },
      { slug: 'es', name: 'Español (EU)' },
      { slug: 'fr', name: 'Français' },
      { slug: 'it', name: 'Italiano' },
      { slug: 'pt', name: 'Português (EU)' },
      { slug: 'ru', name: 'Русский' },
    ]
  },
  {
    slug: 'kr',
    name: 'Korea',
    languages: [
      { slug: 'ko', name: '한국어' },
    ]
  },
  {
    slug: 'tw',
    name: 'Taiwan',
    languages: [
      { slug: 'zh', name: '繁體中文' },
    ]
  },
];

// Icons
export const BLIZZARD_ICONS = "assets/blizzard-icons.svg#";
export const SPEC_ICONS = 'http://media.blizzard.com/wow/icons/36/:iconName.jpg';
// export const TALENT_ICON = 'http://media.blizzard.com/wow/icons/18/:iconName.jpg';       // Old
export const TALENT_ICON = 'https://blzmedia-a.akamaihd.net/wow/icons/56/:iconName.jpg';    // New

// Links
export const WOWPROGRESS = 'https://www.wowprogress.com';
export const WOWPROGRESS_ICON = `${WOWPROGRESS}/favicon.ico`;
export const WOWPROGRESS_CHAR = `${WOWPROGRESS}/character/:region/:realm/:characterName`;

export const WORLDOFWARCRAFT = 'https://www.worldofwarcraft.com/:region-:language';
export const WORLDOFWARCRAFT_ICON = 'http://us.battle.net/wow/static/images/meta/favicon.ico';
export const WORLDOFWARCRAFT_ARMORY = 'http://:region.battle.net/wow/:language/character/:realm/:characterName/simple';
export const LEADERBOARDS_PVE = `${WORLDOFWARCRAFT}/game/pve/leaderboards`;
export const LEADERBOARDS_PVP = `${WORLDOFWARCRAFT}/game/pvp/leaderboards/3v3`;

export const WOW_WEB_ENHACER = 'https://chrome.google.com/webstore/detail/wow-website-enhacer/hhgbpiinmicadgmidmcfoelicbdhdbme';
