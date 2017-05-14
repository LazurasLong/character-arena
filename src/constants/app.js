
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
      { slug: 'en', regionLanguage: 'us', name: 'English (US)' },
      { slug: 'es', regionLanguage: 'mx', name: 'Español (AL)' },
      { slug: 'pt', regionLanguage: 'br', name: 'Português (AL)' },
    ]
  },
  {
    slug: 'eu',
    name: 'Europe',
    languages: [
      { slug: 'de', regionLanguage: 'de', name: 'Deutsch' },
      { slug: 'en', regionLanguage: 'gb', name: 'English (EU)' },
      { slug: 'es', regionLanguage: 'es', name: 'Español (EU)' },
      { slug: 'fr', regionLanguage: 'fr', name: 'Français' },
      { slug: 'it', regionLanguage: 'it', name: 'Italiano' },
      { slug: 'pt', regionLanguage: 'pt', name: 'Português (EU)' },
      { slug: 'ru', regionLanguage: 'ru', name: 'Русский' },
    ]
  },
  {
    slug: 'kr',
    name: 'Korea',
    languages: [
      { slug: 'ko', regionLanguage: 'kr', name: '한국어' },
    ]
  },
  {
    slug: 'tw',
    name: 'Taiwan',
    languages: [
      { slug: 'zh', regionLanguage: 'cn', name: '繁體中文' },
    ]
  },
];

// Icons
export const BLIZZARD_ICONS = "/images/blizzard-icons.svg#";
export const TALENT_ICON = 'https://blzmedia-a.akamaihd.net/wow/icons/56/:iconName.jpg';

// Links
export const IMPERDIBLESOFT = 'http://www.imperdiblesoft.com';
export const WOWPROGRESS = 'https://www.wowprogress.com';
export const WOWPROGRESS_ICON = `${WOWPROGRESS}/favicon.ico`;
export const WOWPROGRESS_CHAR = `${WOWPROGRESS}/character/:region/:realm/:characterName`;
export const WOWPROGRESS_GUILD = `${WOWPROGRESS}/guild/:region/:realm/:guild`;

export const WORLDOFWARCRAFT = 'https://www.worldofwarcraft.com/:language-:regionLanguage';
export const WORLDOFWARCRAFT_ARMORY = `${WORLDOFWARCRAFT}/character/:realm/:characterName`;
export const WORLDOFWARCRAFT_GUILD = 'http://:region.battle.net/wow/:language/guild/:realm/:guild/';
export const LEADERBOARDS_PVE = `${WORLDOFWARCRAFT}/game/pve/leaderboards`;
export const LEADERBOARDS_PVP = `${WORLDOFWARCRAFT}/game/pvp/leaderboards/3v3`;

export const WOW_WEB_ENHACER = 'https://chrome.google.com/webstore/detail/wow-website-enhacer/hhgbpiinmicadgmidmcfoelicbdhdbme';
