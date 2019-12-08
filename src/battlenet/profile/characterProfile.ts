import { ApiResponse, Key, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";
import { RealmShort } from "../gameData/realm";
import { GuildShort } from "./guild";

const CHARACTER_PROFILE_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}";
const CHARACTER_PROFILE_STATUS_PATH = "/profile/wow/character/{realmSlug}/{characterName}/status";

export interface CharacterShort extends ShortEntry {
    realm: RealmShort;
}

/**
 * { item_description }
 */
export interface CharacterProfileSummary extends ApiResponse {
    id: number;
    name: string;
    gender: TypedName;
    faction: TypedName;
    race: ShortEntry;
    character_class: ShortEntry;
    active_spec: ShortEntry;
    realm: RealmShort;
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
    active_title: ShortEntry & {
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
