import { getAccessToken } from "./auth";

enum Region {
    EU = "eu",
    US = "us",
    KR = "kr",
    TW = "tw"
}

/* eslint-disable @typescript-eslint/camelcase */
enum Locale {
    en_US = "en_US",
    es_MX = "es_MX",
    pt_BR = "pt_BR",
    de_DE = "de_DE",
    en_GB = "en_GB",
    es_ES = "es_ES",
    fr_FR = "fr_FR",
    it_IT = "it_IT",
    ru_RU = "ru_RU",
    ko_KR = "ko_KR",
    zh_TW = "zh_TW",
    zh_CN = "zh_CN"
}
/* eslint-enable @typescript-eslint/camelcase */

export type Namespace = "static" | "dynamic" | "profile";

export const REGION: Region = Region.EU;
export const LOCALE: Locale = Locale.en_GB;
export const API_BASE_URL = `https://${REGION}.api.blizzard.com`;
export const BNET_BASE_URL = `https://${REGION}.battle.net`;

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

    // add locale
    url += `&locale=${LOCALE}`;

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
