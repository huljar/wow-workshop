import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_HUNTER_PETS_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/hunter-pets";

/**
 * Interface for API call: Profile → Character Hunter Pets → Character Hunter Pets Summary
 */
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

/**
 * Fetches a summary of hunter pets of the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character hunter pets summary
 */
export async function fetchCharacterHunterPetsSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_HUNTER_PETS_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterHunterPetsSummary>(requestUrl);
}
