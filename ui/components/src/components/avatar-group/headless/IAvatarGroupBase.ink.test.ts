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

const AVATAR_GROUP_BASE = resolveComponent(import.meta.url, "./IAvatarGroupBase.ink.tsx");

describe("AvatarGroupBase", () => {
  it("compiles to all 7 targets without errors", async () => {
    const result = await compileComponent(AVATAR_GROUP_BASE);
    expectCompilationSuccess(result);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("produces zero diagnostics", async () => {
    expectNoDiagnostics(await compileComponent(AVATAR_GROUP_BASE));
  });

  it("produces correct file extensions per target", async () => {
    expectCorrectFileExtensions(await compileComponent(AVATAR_GROUP_BASE));
  });

  it("passes conformance invariants for all targets", async () => {
    assertConformance(await compileComponent(AVATAR_GROUP_BASE));
  });

  it("output matches snapshots", async () => {
    expect(snapshotOutput(await compileComponent(AVATAR_GROUP_BASE))).toMatchSnapshot();
  });
});
