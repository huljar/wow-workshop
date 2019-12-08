import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_REPUTATIONS_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/reputations";

export interface CharacterReputationsSummary extends ApiResponse {
    character: CharacterShort;
    reputations: {
        faction: ShortEntry;
        standing: {
            raw: number;
            value: number;
            max: number;
            tier: number;
            name: string;
        };
        paragon?: {
            raw: number;
            value: number;
            max: number;
        };
    }[];
}

export async function fetchCharacterReputationsSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_REPUTATIONS_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterReputationsSummary>(requestUrl);
}
