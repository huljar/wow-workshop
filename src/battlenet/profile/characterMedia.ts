import { ApiResponse, generateRequestUrl, callApi, format } from "../utils";

const CHARACTER_MEDIA_PATH = "/profile/wow/character/{realmSlug}/{characterName}/character-media";

export interface CharacterMedia extends ApiResponse {
    character: {
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
    avatar_url: string;
    bust_url: string;
    render_url: string;
}

export async function fetchCharacterMedia(realmSlug: string, characterName: string) {
    const requestUrl = await generateRequestUrl(format(CHARACTER_MEDIA_PATH, { realmSlug, characterName }), "profile");
    return await callApi<CharacterMedia>(requestUrl);
}
