import { ApiResponse, Key, TypedName, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_PVP_BRACKET_STATISTICS_PATH =
    "/profile/wow/character/{realmSlug}/{characterName}/pvp-bracket/{pvpBracket}";
const CHARACTER_PVP_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/pvp-summary";

interface MatchStatistics {
    played: number;
    won: number;
    lost: number;
}

export interface CharacterPvPBracketStatistics extends ApiResponse {
    character: CharacterShort;
    faction: TypedName;
    bracket: {
        id: number;
        type: string;
    };
    rating: number;
    season: {
        key: Key;
        id: number;
    };
    tier: {
        key: Key;
        id: number;
    };
    season_match_statistics: MatchStatistics;
    weekly_match_statistics: MatchStatistics;
}

export interface CharacterPvPSummary extends ApiResponse {
    brackets: Key[];
    honor_level: number;
    pvp_map_statistics: {
        world_map: {
            name: string;
            id: number;
        };
        match_statistics: MatchStatistics;
    }[];
    honorable_kills: number;
    character: CharacterShort;
}

export async function fetchCharacterPvPBracketStatistics(realmSlug: string, characterName: string, pvpBracket: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_PVP_BRACKET_STATISTICS_PATH, { realmSlug, characterName, pvpBracket }),
        "profile"
    );
    return callApi<CharacterPvPBracketStatistics>(requestUrl);
}

export async function fetchCharacterPvPSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_PVP_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterPvPSummary>(requestUrl);
}
