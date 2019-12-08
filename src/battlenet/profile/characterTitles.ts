import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_TITLES_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/titles";

/**
 * Interface for API call: Profile → Character Titles → Character Titles Summary
 */
export interface CharacterTitlesSummary extends ApiResponse {
    character: CharacterShort;
    active_title: ShortEntry & {
        display_string: string;
    };
    titles: ShortEntry[];
}

/**
 * Fetches a summary of titles of the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character titles summary
 */
export async function fetchCharacterTitlesSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_TITLES_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterTitlesSummary>(requestUrl);
}
