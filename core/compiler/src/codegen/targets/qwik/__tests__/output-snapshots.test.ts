// Full Qwik output snapshots: compile each fixture through the real pipeline and snapshot the
// generated source. Loops over fixtures (a single target), so the golden output of every fixture
// is pinned for Qwik.

import { describe, it, expect } from "vitest";
import {
  CORE_FIXTURES,
  NEW_FIXTURES,
  compileTo,
  compileToAll,
} from "../../../../testing/codegen.ts";

describe("qwik full output snapshots", () => {
  for (const fixture of [...CORE_FIXTURES, ...NEW_FIXTURES]) {
    it(fixture, async () => {
      expect(await compileTo(fixture, "qwik")).toMatchSnapshot();
    });
  }
});

describe("qwik multi-component files", () => {
  it("ComponentRef (all files)", async () => {
    expect(await compileToAll("ComponentRef", "qwik")).toMatchSnapshot();
  });
});
