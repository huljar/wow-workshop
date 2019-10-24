import { ApiResponse, generateRequestUrl, callApi, format } from "../utils";

const REALM_INDEX_PATH = "/data/wow/realm/index";
const REALM_PATH = "/data/wow/realm/{realmSlug}";

/**
 * Interface for API call: Game Data API → Realm API → Realms Index
 */
export interface RealmList extends ApiResponse {
    realms: {
        key: {
            href: string;
        };
        name: string;
        id: number;
        slug: string;
    }[];
}

export interface Realm extends ApiResponse {
    id: number;
    region: {
        key: {
            href: string;
        };
        name: string;
        id: number;
    };
    connected_realm: {
        href: string;
    };
    name: string;
    category: string;
    locale: string;
    timezone: string;
    type: {
        type: string;
        name: string;
    };
    is_tournament: boolean;
    slug: string;
}

/**
 * Fetches the list of all realms in the region.
 *
 * @return  Promise that resolves to the realm list.
 */
export async function fetchRealmList() {
    const requestUrl = await generateRequestUrl(REALM_INDEX_PATH, "dynamic");
    return await callApi<RealmList>(requestUrl);
}

/**
 * Fetches detailed information about a realm.
 *
 * @return  Promise that resolves to the realm information.
 */
export async function fetchRealmDetails(realmSlug: string) {
    const requestUrl = await generateRequestUrl(format(REALM_PATH, { realmSlug }), "dynamic");
    return await callApi<Realm>(requestUrl);
}
