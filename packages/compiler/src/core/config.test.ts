import { describe, it, expect } from "vitest";
import { defineConfig } from "./config.ts";

describe("defineConfig", () => {
  it("returns the config unchanged", () => {
    const config = { targets: ["react"] as const };
    expect(defineConfig(config)).toBe(config);
  });
});
