import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_ACHIEVEMENTS_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/achievements";

export interface CharacterAchievement {
    id: number;
    achievement: ShortEntry;
    criteria: {
        id: number;
        amount?: number;
        is_completed: boolean;
        child_criteria: {
            id: number;
            amount: number;
            is_completed: boolean;
        }[];
    };
    completed_timestamp: number;
}

/**
 * Interface for API call: Profile → Character Achievements → Character Achievements Summary
 */
export interface CharacterAchievementsSummary extends ApiResponse {
    total_quantity: number;
    total_points: number;
    achievements: CharacterAchievement[];
    category_progress: {
        category: ShortEntry;
        quantity: number;
        points: number;
    }[];
    recent_events: {
        achievement: ShortEntry;
        timestamp: number;
    }[];
    character: CharacterShort;
}

/**
 * Fetches a summary of achievements of the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character achievements summary
 */
export async function fetchCharacterAchievementsSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_ACHIEVEMENTS_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterAchievementsSummary>(requestUrl);
}
