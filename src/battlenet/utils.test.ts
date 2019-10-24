import { generateRequestUrl, callApi, format, API_BASE_URL, REGION, LOCALE } from "./utils";
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
        expect(url).toBe(
            `${API_BASE_URL}/foo/bar?lul=xd&namespace=profile-${REGION}&locale=${LOCALE}&access_token=wow`
        );
    });

    it("generates the correct URL when path does not start with '/' and ends with '?'", async () => {
        const url = await generateRequestUrl("deathknight/unholy?", "dynamic");
        expect(url).toBe(
            `${API_BASE_URL}/deathknight/unholy?namespace=dynamic-${REGION}&locale=${LOCALE}&access_token=wow`
        );
    });

    it("generates the correct URL when path does not start with '/' and ends with '&'", async () => {
        const url = await generateRequestUrl("deathknight/blood?tank=true&", "static");
        expect(url).toBe(
            `${API_BASE_URL}/deathknight/blood?tank=true&namespace=static-${REGION}&locale=${LOCALE}&access_token=wow`
        );
    });

    it("generates the correct URL when path starts with '/' and does not contain '?'", async () => {
        const url = await generateRequestUrl("/deathknight/frost", "static");
        expect(url).toBe(
            `${API_BASE_URL}/deathknight/frost?namespace=static-${REGION}&locale=${LOCALE}&access_token=wow`
        );
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

describe("format", () => {
    it("formats strings with numerical placeholders correctly", () => {
        expect(format("First Arcan{0}t {1} {0} from Sura{2}. {} {3}", "is", "Thalyssra", "mar")).toBe(
            "First Arcanist Thalyssra is from Suramar. {} {3}"
        );
    });

    it("formats strings with named placeholders correctly", () => {
        expect(
            format(
                "{druid}, {priestess}, and {warden} helped {bloodelf} in {continent}, but {warden} betrayed {priestess} to chase {demonhunter}. {yes}",
                {
                    druid: "Malfurion",
                    priestess: "Tyrande",
                    warden: "Maiev",
                    bloodelf: "Kael'thas",
                    continent: "Lordaeron",
                    demonhunter: "Illidan"
                }
            )
        ).toBe(
            "Malfurion, Tyrande, and Maiev helped Kael'thas in Lordaeron, but Maiev betrayed Tyrande to chase Illidan. {yes}"
        );
    });
});
