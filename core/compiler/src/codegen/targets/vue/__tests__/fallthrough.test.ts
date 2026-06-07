// Vue attribute fallthrough: Vue relies on native attribute inheritance, so no
// rest-spread wiring is emitted on a host-element component root.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("attribute fallthrough", () => {
  it("Vue relies on native attribute inheritance — no fallthrough wiring (CrossFileBase)", async () => {
    const code = await compileTo("CrossFileBase", "vue");
    expect(code).not.toContain("__attrs");
    expect(code).toContain('class="base"');
  });
});
