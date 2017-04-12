// Base URLs
export const BASE_URL = 'https://us.api.battle.net';
export const AVATAR_URL = 'https://render-us.worldofwarcraft.com/character/';

// Leaderboards
// export const LEADERBOARD_PVE = `${BASE_URL}/wow/challenge/:realm`;
// export const LEADERBOARDS_PVP = `${BASE_URL}/wow/leaderboard/:bracket`;

// Character Profile
export const CHAR_APPEARANCE = `${BASE_URL}/wow/character/:realm/:characterName?fields=appearance`;
export const CHAR_STATS = `${BASE_URL}/wow/character/:realm/:characterName?fields=stats`;
export const CHAR_TALENTS = `${BASE_URL}/wow/character/:realm/:characterName?fields=talents`;
// export const CHAR_PROGRESSION = `${BASE_URL}/wow/character/:realm/:characterName?fields=progression`;

// Item
export const ITEM = `${BASE_URL}/wow/item/:itemId`;
export const ITEM_SET = `${BASE_URL}/wow/item/set/:setId`;

// Spell
// export const SPELL = `${BASE_URL}/wow/spell/:spellId`;

// Data Resources
export const DATA_RACES = `${BASE_URL}/wow/data/character/races`;
export const DATA_CLASSES = `${BASE_URL}/wow/data/character/classes`;
export const DATA_TALENTS = `${BASE_URL}/wow/data/talent`;
