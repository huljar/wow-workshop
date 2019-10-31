import { ApiResponse, Key, ShortEntry, Asset, generateRequestUrl, callApi, format } from "../utils";

const ACHIEVEMENT_CATEGORIES_INDEX_PATH = "/data/wow/achievement-category/index";
const ACHIEVEMENT_CATEGORY_PATH = "/data/wow/achievement-category/{achievementCategoryId}";
const ACHIEVEMENTS_INDEX_PATH = "/data/wow/achievement/index";
const ACHIEVEMENT_PATH = "/data/wow/achievement/{achievementId}";
const ACHIEVEMENT_MEDIA_PATH = "/data/wow/media/achievement/{achievementId}";

export interface AchievementCategoriesIndex extends ApiResponse {
    categories: ShortEntry[];
    root_categories: ShortEntry[];
    guild_categories: ShortEntry[];
}

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

export interface AchievementsIndex extends ApiResponse {
    achievements: ShortEntry[];
}

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

export interface AchievementMedia extends ApiResponse {
    assets: Asset[];
}

export async function fetchAchievementCategoriesIndex() {
    const requestUrl = await generateRequestUrl(ACHIEVEMENT_CATEGORIES_INDEX_PATH, "static");
    return callApi<AchievementCategoriesIndex>(requestUrl);
}

export async function fetchAchievementCategory(achievementCategoryId: number) {
    const requestUrl = await generateRequestUrl(format(ACHIEVEMENT_CATEGORY_PATH, { achievementCategoryId }), "static");
    return callApi<AchievementCategory>(requestUrl);
}

export async function fetchAchievementsIndex() {
    const requestUrl = await generateRequestUrl(ACHIEVEMENTS_INDEX_PATH, "static");
    return callApi<AchievementsIndex>(requestUrl);
}

export async function fetchAchievement(achievementId: number) {
    const requestUrl = await generateRequestUrl(format(ACHIEVEMENT_PATH, { achievementId }), "static");
    return callApi<Achievement>(requestUrl);
}

export async function fetchAchievementMedia(achievementId: number) {
    const requestUrl = await generateRequestUrl(format(ACHIEVEMENT_MEDIA_PATH, { achievementId }), "static");
    return callApi<AchievementMedia>(requestUrl);
}
