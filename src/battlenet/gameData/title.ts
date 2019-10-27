import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const TITLE_INDEX_PATH = "/data/wow/title/index";
const TITLE_PATH = "/data/wow/title/{titleId}";

export interface TitleShort {
    key: Key;
    name: string;
    id: number;
}

export interface TitleIndex extends ApiResponse {
    titles: TitleShort[];
}

export interface Title extends ApiResponse {
    key: Key;
    id: number;
    name: string;
    gender_name: {
        male: string;
        female: string;
    };
}

export async function fetchTitleIndex() {
    const requestUrl = await generateRequestUrl(TITLE_INDEX_PATH, "static");
    return callApi<TitleIndex>(requestUrl);
}

export async function fetchTitle(titleId: number) {
    const requestUrl = await generateRequestUrl(format(TITLE_PATH, { titleId }), "static");
    return callApi<Title>(requestUrl);
}
