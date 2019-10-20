import { generateHeaders, REGION } from "./utils";
import { AccessToken } from "./auth";

/* eslint @typescript-eslint/camelcase: "off" */
describe("generateHeaders", () => {
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

    it("adds the correct headers", async () => {
        const headers = await generateHeaders("profile", {
            "X-Powered-By": "Blizzard"
        });
        expect(headers.get("X-Powered-By")).toBe("Blizzard");
        expect(headers.get("Authorization")).toBe("Bearer wow");
        expect(headers.get("Battlenet-Namespace")).toBe(`profile-${REGION}`);
    });
});
