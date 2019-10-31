import { ApiResponse, Key, generateRequestUrl, callApi, format } from "../utils";

const REALM_INDEX_PATH = "/data/wow/realm/index";
const REALM_PATH = "/data/wow/realm/{realmSlug}";

export interface RealmShort {
    key: Key;
    name: string;
    id: number;
    slug: string;
}

export interface RealmDetails {
    id: number;
    region: {
        key: Key;
        name: string;
        id: number;
    };
    connected_realm: Key;
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
 * Interface for API call: Game Data → Realm → Realms Index
 */
export interface RealmIndex extends ApiResponse {
    realms: RealmShort[];
}

/**
 * Type for API call: Game Data → Realm → Realm
 */
export type Realm = RealmDetails & ApiResponse;

/**
 * Fetches the index of all realms in the region.
 *
 * @return  Promise that resolves to the realm index.
 */
export async function fetchRealmIndex() {
    const requestUrl = await generateRequestUrl(REALM_INDEX_PATH, "dynamic");
    return callApi<RealmIndex>(requestUrl);
}

/**
 * Fetches detailed information about a realm.
 *
 * @param  realmSlug  Slug string of the realm
 * @return  Promise that resolves to the realm information
 */
export async function fetchRealm(realmSlug: string) {
    const requestUrl = await generateRequestUrl(format(REALM_PATH, { realmSlug }), "dynamic");
    return callApi<Realm>(requestUrl);
}
