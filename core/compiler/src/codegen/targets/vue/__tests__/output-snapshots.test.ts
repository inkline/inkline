// Full Vue output snapshots: compile each fixture through the real pipeline and snapshot the
// generated source. Loops over fixtures (a single target), so the golden output of every fixture
// is pinned for Vue.

import { describe, it, expect } from "vitest";
import {
  CORE_FIXTURES,
  NEW_FIXTURES,
  compileTo,
  compileToAll,
} from "../../../../testing/codegen.ts";

describe("vue full output snapshots", () => {
  for (const fixture of [...CORE_FIXTURES, ...NEW_FIXTURES]) {
    it(fixture, async () => {
      expect(await compileTo(fixture, "vue")).toMatchSnapshot();
    });
  }
});

describe("vue multi-component files", () => {
  it("ComponentRef (all files)", async () => {
    expect(await compileToAll("ComponentRef", "vue")).toMatchSnapshot();
  });
});
