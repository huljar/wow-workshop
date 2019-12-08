import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_HUNTER_PETS_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/hunter-pets";

export interface CharacterHunterPetsSummary extends ApiResponse {
    character: CharacterShort;
    hunter_pets: {
        name: string;
        level: number;
        creature: ShortEntry;
        slot: number;
        is_active?: true;
        is_summoned?: true;
    }[];
}

export async function fetchCharacterHunterPetsSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_HUNTER_PETS_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterHunterPetsSummary>(requestUrl);
}
