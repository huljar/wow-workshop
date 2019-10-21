import { generateRequestUrl, callApi, API_BASE_URL, REGION } from "./utils";
import { AccessToken } from "./auth";

/* eslint @typescript-eslint/camelcase: "off", @typescript-eslint/no-explicit-any: "off" */
describe("generateRequestUrl", () => {
    beforeAll(() => {
        spyOn(window, "fetch").and.returnValue(
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve<AccessToken>({
                        access_token: "wow",
                        token_type: "no",
                        expires_in: 10000
                    })
            })
        );
    });

    it("generates the correct URL when path starts with '/' and contains '?'", async () => {
        const url = await generateRequestUrl("/foo/bar?lul=xd", "profile");
        expect(url).toBe(`${API_BASE_URL}/foo/bar?lul=xd&namespace=profile-${REGION}&access_token=wow`);
    });

    it("generates the correct URL when path does not start with '/' and ends with '?'", async () => {
        const url = await generateRequestUrl("deathknight/unholy?", "dynamic");
        expect(url).toBe(`${API_BASE_URL}/deathknight/unholy?namespace=dynamic-${REGION}&access_token=wow`);
    });

    it("generates the correct URL when path does not start with '/' and ends with '&'", async () => {
        const url = await generateRequestUrl("deathknight/blood?tank=true&", "static");
        expect(url).toBe(`${API_BASE_URL}/deathknight/blood?tank=true&namespace=static-${REGION}&access_token=wow`);
    });

    it("generates the correct URL when path starts with '/' and does not contain '?'", async () => {
        const url = await generateRequestUrl("/deathknight/frost", "static");
        expect(url).toBe(`${API_BASE_URL}/deathknight/frost?namespace=static-${REGION}&access_token=wow`);
    });
});

describe("callApi", () => {
    it("correctly fetches and parses the JSON response", async () => {
        spyOn(window, "fetch").and.callFake(url => {
            expect(url).toBe("foobar");
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ something: ["with", 3, "entries"] })
            });
        });

        const json = await callApi<{ something: any[] }>("foobar");
        expect(json).toEqual({ something: ["with", 3, "entries"] });
    });

    it("rejects when the response is not with code 2xx", async done => {
        spyOn(window, "fetch").and.returnValue(
            Promise.resolve({
                ok: false,
                status: 418,
                statusText: "I'm a teapot"
            })
        );

        try {
            await callApi("foobar");
        } catch (error) {
            expect(error).toBe("418 I'm a teapot");
            done();
        }
    });
});
