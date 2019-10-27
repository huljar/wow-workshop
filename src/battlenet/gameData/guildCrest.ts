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

export interface GuildCrestComponentsIndex extends ApiResponse {
    emblems: ComponentShort[];
    borders: ComponentShort[];
}

export interface GuildCrestBorderMedia extends ApiResponse {
    assets: Asset[];
}

export interface GuildCrestEmblemMedia extends ApiResponse {
    assets: Asset[];
}

export async function fetchGuildCrestComponentsIndex() {
    const requestUrl = await generateRequestUrl(GUILD_CREST_COMPONENTS_INDEX_PATH, "static");
    return callApi<GuildCrestComponentsIndex>(requestUrl);
}

export async function fetchGuildCrestBorderMedia(borderId: number) {
    const requestUrl = await generateRequestUrl(format(GUILD_CREST_BORDER_MEDIA_PATH, { borderId }), "static");
    return callApi<GuildCrestBorderMedia>(requestUrl);
}

export async function fetchGuildCrestEmblemMedia(emblemId: number) {
    const requestUrl = await generateRequestUrl(format(GUILD_CREST_EMBLEM_MEDIA_PATH, { emblemId }), "static");
    return callApi<GuildCrestEmblemMedia>(requestUrl);
}
