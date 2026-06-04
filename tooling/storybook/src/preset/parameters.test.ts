import { describe, it, expect, vi, afterEach } from "vitest";
import { sharedParameters, setFramework } from "./parameters.ts";

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

describe("setFramework", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("tags the document element with the framework when a document exists", () => {
    const documentElement = { dataset: {} as Record<string, string> };
    vi.stubGlobal("document", { documentElement });

    setFramework("react");

    expect(documentElement.dataset.framework).toBe("react");
  });

  it("is a no-op without throwing when there is no document", () => {
    vi.stubGlobal("document", undefined);

    expect(() => setFramework("vue")).not.toThrow();
  });
});
