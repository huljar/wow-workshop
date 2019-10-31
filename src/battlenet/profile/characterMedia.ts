import { ApiResponse, ShortEntry, generateRequestUrl, callApi, format } from "../utils";
import { RealmShort } from "../gameData/realm";

const CHARACTER_MEDIA_PATH = "/profile/wow/character/{realmSlug}/{characterName}/character-media";

export interface CharacterMedia extends ApiResponse {
    character: ShortEntry & {
        realm: RealmShort;
    };
    avatar_url: string;
    bust_url: string;
    render_url: string;
}

export async function fetchCharacterMedia(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(format(CHARACTER_MEDIA_PATH, { realmSlug, characterName }), "profile");
    return callApi<CharacterMedia>(requestUrl);
}
