import { describe, it, expect } from "vitest";
import { sharedParameters } from "./parameters.ts";

describe("sharedParameters", () => {
  it("centers the canvas", () => {
    expect(sharedParameters.layout).toBe("centered");
  });

  it("infers color and date controls by prop-name matchers", () => {
    expect("background").toMatch(sharedParameters.controls.matchers.color);
    expect("borderColor").toMatch(sharedParameters.controls.matchers.color);
    expect("createdDate").toMatch(sharedParameters.controls.matchers.date);
    expect("label").not.toMatch(sharedParameters.controls.matchers.color);
  });

  it("exposes no decorators (renderer-specific, kept local per framework)", () => {
    expect("decorators" in sharedParameters).toBe(false);
  });
});
