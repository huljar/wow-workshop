import { BNET_BASE_URL } from "./utils";
import APIKey from "./apikey.json";

/**
 * Access Token type conforming with the OAuth2 standard.
 */
export interface AccessToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope?: string;
}

const OAUTH_PATH = "/oauth/token";
let accessToken: Promise<Readonly<AccessToken>> | undefined;

/**
 * Request an access token from battle.net using the credentials provided in the apikey.json file. The fetched token is
 * cached for future requests.
 *
 * @return  A promise that resolves to the access token if successful. Otherwise, it is rejected.
 */
export function getAccessToken(): Promise<Readonly<AccessToken>> {
    if (!accessToken) {
        const requestUrl = `${BNET_BASE_URL}${OAUTH_PATH}`;
        const headers = new Headers();
        headers.append("Authorization", `Basic ${btoa(`${APIKey.client_id}:${APIKey.client_secret}`)}`);
        const formData = new FormData();
        formData.append("grant_type", "client_credentials");

        accessToken = fetch(requestUrl, {
            method: "POST",
            headers: headers,
            body: formData
        }).then(response =>
            response.ok ? response.json() : Promise.reject(`${response.status} ${response.statusText}`)
        );
    }

    return accessToken;
}

/**
 * Invalidates the cached access token.
 */
export function invalidateAccessToken(): void {
    accessToken = undefined;
}
