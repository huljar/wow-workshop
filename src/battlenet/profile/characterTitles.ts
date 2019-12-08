import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_TITLES_SUMMARY_PATH = "/profile/wow/character/{realmSlug}/{characterName}/titles";

export interface CharacterTitlesSummary extends ApiResponse {
    character: CharacterShort;
    active_title: ShortEntry & {
        display_string: string;
    };
    titles: ShortEntry[];
}

export async function fetchCharacterTitlesSummary(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(
        format(CHARACTER_TITLES_SUMMARY_PATH, { realmSlug, characterName }),
        "profile"
    );
    return callApi<CharacterTitlesSummary>(requestUrl);
}
