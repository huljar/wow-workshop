import { ApiResponse, Key, ShortEntry, Gendered, generateRequestUrl, callApi, format } from "../utils";

const TITLE_INDEX_PATH = "/data/wow/title/index";
const TITLE_PATH = "/data/wow/title/{titleId}";

/**
 * Interface for API call: Game Data → Title → Title Index
 */
export interface TitleIndex extends ApiResponse {
    titles: ShortEntry[];
}

/**
 * Interface for API call: Game Data → Title → Title
 */
export interface Title extends ApiResponse {
    key: Key;
    id: number;
    name: string;
    gender_name: Gendered<string>;
}

/**
 * Fetches an index of titles.
 *
 * @return  Promise that resolves to the title index
 */
export async function fetchTitleIndex() {
    const requestUrl = await generateRequestUrl(TITLE_INDEX_PATH, "static");
    return callApi<TitleIndex>(requestUrl);
}

/**
 * Fetches detailed information about a title.
 *
 * @param  titleId  The title identifier
 * @return  Promise that resolves to the title information
 */
export async function fetchTitle(titleId: number) {
    const requestUrl = await generateRequestUrl(format(TITLE_PATH, { titleId }), "static");
    return callApi<Title>(requestUrl);
}
