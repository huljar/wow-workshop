import { fetchRegionsIndex } from "./region";
import * as Auth from "../auth";

/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
describe("fetchRegionsIndex", () => {
    describe("correctly extracts the region ID from the returned href", () => {
        beforeAll(() => {
            spyOn(Auth, "getAccessToken").and.returnValue({
                access_token: "Molten",
                token_type: "Core",
                expires_in: 60
            });
        });

        it("single digit", async () => {
            spyOn(window, "fetch").and.returnValue(
                Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve<any>({
                            _links: {
                                self: {
                                    href: "localhost"
                                }
                            },
                            regions: [
                                {
                                    href: "https://eu.api.blizzard.com/data/wow/region/3?namespace=dynamic-eu"
                                }
                            ]
                        })
                })
            );
            expect(await fetchRegionsIndex()).toEqual({
                _links: {
                    self: {
                        href: "localhost"
                    }
                },
                regions: [
                    {
                        key: {
                            href: "https://eu.api.blizzard.com/data/wow/region/3?namespace=dynamic-eu"
                        },
                        id: 3
                    }
                ]
            });
            expect(Auth.getAccessToken).toHaveBeenCalled();
        });

        it("multiple digits", async () => {
            spyOn(window, "fetch").and.returnValue(
                Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve<any>({
                            _links: {
                                self: {
                                    href: "localhost"
                                }
                            },
                            regions: [
                                {
                                    href: "https://us.api.blizzard.com/data/wow/region/666?namespace=dynamic-us"
                                }
                            ]
                        })
                })
            );
            expect(await fetchRegionsIndex()).toEqual({
                _links: {
                    self: {
                        href: "localhost"
                    }
                },
                regions: [
                    {
                        key: {
                            href: "https://us.api.blizzard.com/data/wow/region/666?namespace=dynamic-us"
                        },
                        id: 666
                    }
                ]
            });
            expect(Auth.getAccessToken).toHaveBeenCalled();
        });
    });
});
