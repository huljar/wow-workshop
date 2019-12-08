import { ApiResponse, Key, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_MYTHIC_KEYSTONE_PROFILE_INDEX_PATH =
    "/profile/wow/character/{realmSlug}/{characterName}/mythic-keystone-profile";
const CHARACTER_MYTHIC_KEYSTONE_SEASON_DETAILS_PATH =
    "/profile/wow/character/{realmSlug}/{characterName}/mythic-keystone-profile/season/{seasonId}";

/**
 * Interface for API call: Game Data → Character Mythic Keystone → Character Mythic Keystone Profile
 */
export interface CharacterMythicKeystoneProfile extends ApiResponse {
    current_period: {
        period: {
            key: Key;
            id: number;
        };
    };
    seasons: {
        key: Key;
        id: number;
    }[];
    character: CharacterShort;
}

/**
 * Interface for API call: Game Data → Character Mythic Keystone → Character Mythic Keystone Season Details
 */
export interface CharacterMythicKeystoneSeasonDetails extends ApiResponse {
    season: {
        key: Key;
        id: number;
    };
    best_runs: {
        completed_timestamp: number;
        duration: number;
        keystone_level: number;
        keystone_affixes: ShortEntry[];
        members: {
            character: ShortEntry & {
                realm: {
                    key: Key;
                    id: number;
                    slug: string;
                };
            };
            specialization: ShortEntry;
            race: ShortEntry;
            equipped_item_level: number;
        }[];
        dungeon: ShortEntry;
        is_completed_within_time: boolean;
    }[];
    character: CharacterShort;
}

/**
 * Fetches the mythic keystone profile of the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character's mythic keystone profile
 */
export async function fetchCharacterMythicKeystoneProfile(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_MYTHIC_KEYSTONE_PROFILE_INDEX_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterMythicKeystoneProfile>(requestUrl);
}

/**
 * Fetches the mythic keystone season details of the given character and season.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @param  seasonId       The season identifier
 * @return  Promise that resolves to the character's mythic keystone season details
 */
export async function fetchCharacterMythicKeystoneSeasonDetails(
    realmSlug: string,
    characterName: string,
    seasonId: number
) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_MYTHIC_KEYSTONE_SEASON_DETAILS_PATH, { realmSlug, characterName, seasonId }),
        "profile"
    );
    return callApi<CharacterMythicKeystoneSeasonDetails>(requestUrl);
}
