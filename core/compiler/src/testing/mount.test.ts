import { describe, it, expect } from "vitest";
import { mountForTarget, type MountResult } from "./mount.ts";

describe("mountForTarget", () => {
  it("throws for unsupported target", async () => {
    await expect(mountForTarget("angular", { path: "x.ts", contents: "" })).rejects.toThrow(
      'unsupported target "angular"',
    );
  });

  it("exports MountResult type", () => {
    const r: MountResult = { html: "<div/>", warnings: [] };
    expect(r.html).toBe("<div/>");
  });
});
