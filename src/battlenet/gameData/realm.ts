import { ApiResponse, Key, ShortEntry, TypedName, generateRequestUrl, callApi, format } from "../utils";

const REALM_INDEX_PATH = "/data/wow/realm/index";
const REALM_PATH = "/data/wow/realm/{realmSlug}";

export interface RealmShort extends ShortEntry {
    slug: string;
}

export interface RealmDetails {
    id: number;
    region: ShortEntry;
    connected_realm: Key;
    name: string;
    category: string;
    locale: string;
    timezone: string;
    type: TypedName;
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
 * Fetches an index of all realms in the configured region.
 *
 * @return  Promise that resolves to the realm index
 */
export async function fetchRealmIndex() {
    const requestUrl = await generateRequestUrl(REALM_INDEX_PATH, "dynamic");
    return callApi<RealmIndex>(requestUrl);
}

/**
 * Fetches an index of all realms in the configured region.
 *
 * @return  Promise that resolves to the realms short
 */
export const fetchRealmsShort = async (): Promise<RealmShort[]> =>
    fetchRealmIndex()
        .then(result => result.realms)
        .catch(error => {
            console.error(error);
            return [];
        });

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
