import { ApiResponse, Key, ShortEntry, Asset, generateRequestUrl, callApi, format } from "../utils";

const ACHIEVEMENT_CATEGORIES_INDEX_PATH = "/data/wow/achievement-category/index";
const ACHIEVEMENT_CATEGORY_PATH = "/data/wow/achievement-category/{achievementCategoryId}";
const ACHIEVEMENTS_INDEX_PATH = "/data/wow/achievement/index";
const ACHIEVEMENT_PATH = "/data/wow/achievement/{achievementId}";
const ACHIEVEMENT_MEDIA_PATH = "/data/wow/media/achievement/{achievementId}";

/**
 * Interface for API call: Game Data → Achievement → Achievement Categories Index
 */
export interface AchievementCategoriesIndex extends ApiResponse {
    categories: ShortEntry[];
    root_categories: ShortEntry[];
    guild_categories: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Achievement → Achievement Category
 */
export interface AchievementCategory extends ApiResponse {
    id: number;
    name: string;
    achievements: ShortEntry[];
    subcategories: ShortEntry[];
    is_guild_category: boolean;
    aggregates_by_faction: {
        alliance: {
            quantity: number;
            points: number;
        };
        horde: {
            quantity: number;
            points: number;
        };
    };
    display_order: number;
}

/**
 * Interface for API call: Game Data → Achievement → Achievements Index
 */
export interface AchievementsIndex extends ApiResponse {
    achievements: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Achievement → Achievement
 */
export interface Achievement extends ApiResponse {
    id: number;
    category: ShortEntry;
    name: string;
    description: string;
    points: number;
    is_account_wide: boolean;
    criteria: {
        id: number;
        description: string;
        amount: number;
    };
    prerequisite_achievement?: ShortEntry;
    next_achievement?: ShortEntry;
    media: {
        key: Key;
        id: number;
    };
    display_order: number;
}

/**
 * Interface for API call: Game Data → Achievement → Achievement Media
 */
export interface AchievementMedia extends ApiResponse {
    assets: Asset[];
}

/**
 * Fetches the index of all achievement categories
 *
 * @return  Promise that resolves to the achievement categories index
 */
export async function fetchAchievementCategoriesIndex() {
    const requestUrl = await generateRequestUrl(ACHIEVEMENT_CATEGORIES_INDEX_PATH, "static");
    return callApi<AchievementCategoriesIndex>(requestUrl);
}

/**
 * Fetches detailed information about an achievement category.
 *
 * @param  achievementCategoryId  The achievement category identifier
 * @return  Promise that resolves to the achievement category information
 */
export async function fetchAchievementCategory(achievementCategoryId: number) {
    const requestUrl = await generateRequestUrl(format(ACHIEVEMENT_CATEGORY_PATH, { achievementCategoryId }), "static");
    return callApi<AchievementCategory>(requestUrl);
}

/**
 * Fetches an index of all achievements.
 *
 * @return  Promise that resolves to the achievements index
 */
export async function fetchAchievementsIndex() {
    const requestUrl = await generateRequestUrl(ACHIEVEMENTS_INDEX_PATH, "static");
    return callApi<AchievementsIndex>(requestUrl);
}

/**
 * Fetches detailed information about an achievement.
 *
 * @param  achievementId  The achievement identifier
 * @return  Promise that resolves to the achievement information
 */
export async function fetchAchievement(achievementId: number) {
    const requestUrl = await generateRequestUrl(format(ACHIEVEMENT_PATH, { achievementId }), "static");
    return callApi<Achievement>(requestUrl);
}

/**
 * Fetches media corresponding to the given achieveent.
 *
 * @param  achievementId  The achievement identifier
 * @return  Promise that resolves to the achievement media
 */
export async function fetchAchievementMedia(achievementId: number) {
    const requestUrl = await generateRequestUrl(format(ACHIEVEMENT_MEDIA_PATH, { achievementId }), "static");
    return callApi<AchievementMedia>(requestUrl);
}
