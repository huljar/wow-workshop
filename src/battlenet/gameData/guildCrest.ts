import { ApiResponse, Key, Asset, generateRequestUrl, callApi, format } from "../utils";

const GUILD_CREST_COMPONENTS_INDEX_PATH = "/data/wow/guild-crest/index";
const GUILD_CREST_BORDER_MEDIA_PATH = "/data/wow/media/guild-crest/border/{borderId}";
const GUILD_CREST_EMBLEM_MEDIA_PATH = "/data/wow/media/guild-crest/emblem/{emblemId}";

interface ComponentShort {
    id: number;
    media: {
        key: Key;
    };
}

/**
 * Interface for API call: Game Data → Guild Crest → Guild Crest Components
 */
export interface GuildCrestComponentsIndex extends ApiResponse {
    emblems: ComponentShort[];
    borders: ComponentShort[];
}

/**
 * Interface for API call: Game Data → Guild Crest → Guild Crest Border Media
 */
export interface GuildCrestBorderMedia extends ApiResponse {
    assets: Asset[];
}

/**
 * Interface for API call: Game Data → Guild Crest → Guild Crest Emblem Media
 */
export interface GuildCrestEmblemMedia extends ApiResponse {
    assets: Asset[];
}

/**
 * Fetches an index of guild crest components.
 *
 * @return  Promise that resolves to the guild crest components index
 */
export async function fetchGuildCrestComponentsIndex() {
    const requestUrl = await generateRequestUrl(GUILD_CREST_COMPONENTS_INDEX_PATH, "static");
    return callApi<GuildCrestComponentsIndex>(requestUrl);
}

/**
 * Fetches media corresponding to the given guild crest border.
 *
 * @param  borderId  The border identifier
 * @return  Promise that resolves to the guild crest border media
 */
export async function fetchGuildCrestBorderMedia(borderId: number) {
    const requestUrl = await generateRequestUrl(format(GUILD_CREST_BORDER_MEDIA_PATH, { borderId }), "static");
    return callApi<GuildCrestBorderMedia>(requestUrl);
}

/**
 * Fetches media corresponding to the given guild crest emblem.
 *
 * @param  emblemId  The emblem identifier
 * @return  Promise that resolves to the guild crest emblem media
 */
export async function fetchGuildCrestEmblemMedia(emblemId: number) {
    const requestUrl = await generateRequestUrl(format(GUILD_CREST_EMBLEM_MEDIA_PATH, { emblemId }), "static");
    return callApi<GuildCrestEmblemMedia>(requestUrl);
}
