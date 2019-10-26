import { ApiResponse, generateRequestUrl, callApi, format } from "../utils";

const CHARACTER_PROFILE_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}";
const CHARACTER_PROFILE_STATUS_PATH = "/profile/wow/character/{realmSlug}/{characterName}/status";

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
        key: {
            href: string;
        };
        name: string;
        id: number;
    };
    character_class: {
        key: {
            href: string;
        };
        name: string;
        id: number;
    };
    active_spec: {
        key: {
            href: string;
        };
        name: string;
        id: number;
    };
    realm: {
        key: {
            href: string;
        };
        name: string;
        id: number;
        slug: string;
    };
    guild: {
        key: {
            href: string;
        };
        name: string;
        id: number;
        realm: {
            key: {
                href: string;
            };
            name: string;
            id: number;
            slug: string;
        };
    };
    level: number;
    experience: number;
    achievement_points: number;
    achievements: {
        href: string;
    };
    titles: {
        href: string;
    };
    pvp_summary: {
        href: string;
    };
    raid_progression: {
        href: string;
    };
    media: {
        href: string;
    };
    last_login_timestamp: number;
    average_item_level: number;
    equipped_item_level: number;
    specializations: {
        href: string;
    };
    statistics: {
        href: string;
    };
    mythic_keystone_profile: {
        href: string;
    };
    equipment: {
        href: string;
    };
    appearance: {
        href: string;
    };
    collections: {
        href: string;
    };
    active_title: {
        key: {
            href: string;
        };
        name: string;
        id: number;
        display_string: string;
    };
    reputations: {
        href: string;
    };
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
    return await callApi<CharacterProfileSummary>(requestUrl);
}

export async function fetchCharacterProfileStatus(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_PROFILE_STATUS_PATH, { realmSlug, characterName }),
        "profile"
    );
    return await callApi<CharacterProfileStatus>(requestUrl);
}
