import { describe, it, expect } from "vitest";
import { renderAstro } from "./astro.ts";
import { frameworkByTarget } from "../config.ts";

describe("renderAstro", () => {
  it("throws a directive pointing at the deferred phase", () => {
    const astro = frameworkByTarget("astro")!;
    expect(() =>
      renderAstro({ component: "Button", title: "Components/Button", stories: {} }, astro),
    ).toThrow(/not implemented yet \(deferred to the Qwik \+ Astro phase\)/);
  });
});
