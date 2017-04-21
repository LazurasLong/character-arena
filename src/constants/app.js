
// App data
export const TITLE = 'Character Arena';
export const SLUG = 'character-arena';
export const EMAIL = 'rafael.perez@imperdiblesoft.com';
export const SITE_URL = 'https://characterarena.com';
export const REPO_URL = `https://www.github.com/ImperdibleSoft/${SLUG}`;
export const COLOR = '#1C110D';
export const DESCRIPTION = 'Compare your character with others, and learn what you need to change';

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
export const BLIZZARD_ICONS = "/images/blizzard-icons.svg#";
// export const SPEC_ICONS = 'http://media.blizzard.com/wow/icons/36/:iconName.jpg';
// export const TALENT_ICON = 'https://media.blizzard.com/wow/icons/18/:iconName.jpg';       // Old
export const TALENT_ICON = 'https://blzmedia-a.akamaihd.net/wow/icons/56/:iconName.jpg';    // New
// Links
export const IMPERDIBLESOFT = 'http://www.imperdiblesoft.com';
export const WOWPROGRESS = 'https://www.wowprogress.com';
export const WOWPROGRESS_ICON = `${WOWPROGRESS}/favicon.ico`;
export const WOWPROGRESS_CHAR = `${WOWPROGRESS}/character/:region/:realm/:characterName`;

export const WORLDOFWARCRAFT = 'https://www.worldofwarcraft.com/:region-:language';
export const WORLDOFWARCRAFT_ICON = 'https://us.battle.net/wow/static/images/meta/favicon.ico';
export const WORLDOFWARCRAFT_ARMORY = 'http://:region.battle.net/wow/:language/character/:realm/:characterName/simple';
export const LEADERBOARDS_PVE = `${WORLDOFWARCRAFT}/game/pve/leaderboards`;
export const LEADERBOARDS_PVP = `${WORLDOFWARCRAFT}/game/pvp/leaderboards/3v3`;

export const WOW_WEB_ENHACER = 'https://chrome.google.com/webstore/detail/wow-website-enhacer/hhgbpiinmicadgmidmcfoelicbdhdbme';
