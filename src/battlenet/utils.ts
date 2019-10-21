import { getAccessToken } from "./auth";

enum Region {
    EU = "eu",
    US = "us",
    KR = "kr",
    TW = "tw"
}

export const REGION: Region = Region.EU;
export const API_BASE_URL = `https://${REGION}.api.blizzard.com`;
export const BNET_BASE_URL = `https://${REGION}.battle.net`;

export type Namespace = "static" | "dynamic" | "profile";

/**
 * Generate a full URL to call the Battle.net API with.
 *
 * @param  path       The request path
 * @param  namespace  The namespace (without region)
 * @return  A promise that resolves to the full request URL
 */
export async function generateRequestUrl(path: string, namespace: Namespace) {
    // build URL: start with API base
    let url = API_BASE_URL;

    // add separator if necessary
    if (!path.startsWith("/")) {
        url += "/";
    }

    // add the specified path
    url += path;

    // add query string or parameter separator if necessary
    if (path.includes("?")) {
        if (!path.endsWith("?") && !path.endsWith("&")) {
            url += "&";
        }
    } else {
        url += "?";
    }

    // add namespace
    url += `namespace=${namespace}-${REGION}`;

    // add access token
    const accessToken = await getAccessToken();
    url += `&access_token=${accessToken.access_token}`;

    return url;
}

/**
 * Execute a call to the Battle.net API and return the JSON-parsed response.
 *
 * @typeparam  T  The type of the response JSON
 * @param  url  The full request URL
 * @return  A promise that resolves to the parsed JSON
 */
export function callApi<T extends object>(url: string): Promise<T> {
    return fetch(url, {
        method: "GET"
    }).then<T>(response =>
        response.ok ? response.json() : Promise.reject(`${response.status} ${response.statusText}`)
    );
}
