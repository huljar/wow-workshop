import { generateRequestUrl, API_BASE_URL, REGION } from "./utils";
import { AccessToken } from "./auth";

/* eslint @typescript-eslint/camelcase: "off" */
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
