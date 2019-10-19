import { AccessToken, getAccessToken, invalidateAccessToken } from "battlenet/auth";

/* eslint @typescript-eslint/camelcase: "off" */
describe("getAccessToken", () => {
    afterEach(() => {
        invalidateAccessToken();
    });

    it("correctly parses the access token", async () => {
        spyOn(window, "fetch").and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve<AccessToken>({
                access_token: "something",
                token_type: "else",
                expires_in: 2
            })
        }));

        const accessToken = await getAccessToken();
        expect(accessToken).toEqual({
            access_token: "something",
            token_type: "else",
            expires_in: 2
        });
    });

    it("rejects when the response is not with code 2xx", done => {
        spyOn(window, "fetch").and.returnValue(Promise.resolve({
            ok: false,
            json: () => {}
        }));

        getAccessToken().catch(done);
    });
});
