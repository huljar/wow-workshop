import { generateRequestUrl, callApi } from "./utils";

const REALM_INDEX_PATH = "/data/wow/realm/index";

/**
 * Interface for API call: Game Data API → Realm API → Realms Index
 */
export interface RealmList {
    _links: {
        self: {
            href: string;
        };
    };
    realms: {
        key: {
            href: string;
        };
        name: string;
        id: number;
        slug: string;
    }[];
}

/**
 * Fetches the list of all reals in the region.
 *
 * @return  Promise that resolves to the realm list.
 */
export async function fetchRealmList() {
    const requestUrl = await generateRequestUrl(REALM_INDEX_PATH, "dynamic");
    return await callApi<RealmList>(requestUrl);
}
