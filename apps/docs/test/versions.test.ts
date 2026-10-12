import { describe, expect, it } from "vitest";
import { VERSIONS } from "../app/data/versions.ts";

/**
 * The version select lists these in both headers. A closed select prerenders no
 * options, so the build test can't see the URLs: this one checks them.
 */
describe("the documented versions", () => {
  it("lists v5 as this site, then v4, v3 and v2 on their own hosts", () => {
    expect(VERSIONS).toEqual([
      { label: "v5" },
      { label: "v4", url: "https://v4.inkline.io/" },
      { label: "v3", url: "https://v3.inkline.io/" },
      { label: "v2", url: "https://v2.inkline.io/" },
    ]);
  });
});
