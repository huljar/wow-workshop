import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";
import { RealmShort } from "../gameData/realm";
import { GuildShort } from "./guild";
import { TitleShort } from "../gameData/title";
import { ClassShort } from "../gameData/playableClass";

const CHARACTER_PROFILE_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}";
const CHARACTER_PROFILE_STATUS_PATH = "/profile/wow/character/{realmSlug}/{characterName}/status";

/**
 * { item_description }
 */
export interface CharacterShort {
    key: Key;
    name: string;
    id: number;
    realm: RealmShort;
}

/**
 * { item_description }
 */
export interface CharacterProfileSummary extends ApiResponse {
    id: number;
    name: string;
    gender: {
        type: string;
        name: string;
    };
    faction: {
        type: string;
        name: string;
    };
    race: {
        key: Key;
        name: string;
        id: number;
    };
    character_class: ClassShort;
    active_spec: {
        key: Key;
        name: string;
        id: number;
    };
    realm: {
        key: Key;
        name: string;
        id: number;
        slug: string;
    };
    guild: GuildShort;
    level: number;
    experience: number;
    achievement_points: number;
    achievements: Key;
    titles: Key;
    pvp_summary: Key;
    raid_progression: Key;
    media: Key;
    last_login_timestamp: number;
    average_item_level: number;
    equipped_item_level: number;
    specializations: Key;
    statistics: Key;
    mythic_keystone_profile: Key;
    equipment: Key;
    appearance: Key;
    collections: Key;
    active_title: TitleShort & {
        display_string: string;
    };
    reputations: Key;
}

export interface CharacterProfileStatus extends ApiResponse {
    id: number;
    is_valid: boolean;
}

export async function fetchCharacterProfileSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_PROFILE_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterProfileSummary>(requestUrl);
}

export async function fetchCharacterProfileStatus(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_PROFILE_STATUS_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterProfileStatus>(requestUrl);
}
