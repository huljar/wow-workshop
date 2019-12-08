import { ApiResponse, generateRequestUrl, callApi, format } from "../utils";
import { CharacterShort } from "./characterProfile";

const CHARACTER_MEDIA_PATH = "/profile/wow/character/{realmSlug}/{characterName}/character-media";

/**
 * Interface for API call: Profile → Character Media → Character Media
 */
export interface CharacterMedia extends ApiResponse {
    character: CharacterShort;
    avatar_url: string;
    bust_url: string;
    render_url: string;
}

/**
 * Fetches media corresponding to the given character.
 *
 * @param  realmSlug      The realm slug
 * @param  characterName  The character name
 * @return  Promise that resolves to the character media
 */
export async function fetchCharacterMedia(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(format(CHARACTER_MEDIA_PATH, { realmSlug, characterName }), "profile");
    return callApi<CharacterMedia>(requestUrl);
}
