import { AccessToken, getAccessToken, invalidateAccessToken } from "./auth";

/* eslint @typescript-eslint/camelcase: "off" */
describe("getAccessToken", () => {
    afterEach(() => {
        invalidateAccessToken();
    });

    it("correctly parses the access token", async () => {
        spyOn(window, "fetch").and.returnValue(
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve<AccessToken>({
                        access_token: "something",
                        token_type: "else",
                        expires_in: 2
                    })
            })
        );

        const accessToken = await getAccessToken();
        expect(accessToken).toEqual({
            access_token: "something",
            token_type: "else",
            expires_in: 2
        });
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
            await getAccessToken();
        } catch (error) {
            expect(error).toBe("418 I'm a teapot");
            done();
        }
    });
});
