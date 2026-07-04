import { describe, it, expect } from "vitest";
import {
  compileComponent,
  expectCompilationSuccess,
  expectCorrectFileExtensions,
  expectNoDiagnostics,
  assertConformance,
  snapshotOutput,
  resolveComponent,
} from "@inkline/test-utils";

const AVATAR_BADGE_BASE = resolveComponent(import.meta.url, "./IAvatarBadgeBase.ink.tsx");

describe("AvatarBadgeBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(AVATAR_BADGE_BASE);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    expectNoDiagnostics(await compileComponent(AVATAR_BADGE_BASE));
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(AVATAR_BADGE_BASE));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(AVATAR_BADGE_BASE));
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(AVATAR_BADGE_BASE))).toMatchSnapshot();
  });
});
