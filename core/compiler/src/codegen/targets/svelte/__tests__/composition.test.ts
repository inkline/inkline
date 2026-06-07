// Svelte codegen assertions for the "composition" feature area: components that instantiate other
// components (same-file children, multiple components per file, cross-file imports). These exercise
// the full pipeline (parse → lower → analyze → codegen) so they catch real bugs in how authored
// `.ink.tsx` composition becomes Svelte output.

import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";

describe("ComponentRef: same-file child instance + forwarded ref", () => {
  it("Svelte: child instance uses bind:this for the ref", async () => {
    const out = await compileToAll("ComponentRef", "svelte");
    expect(out).toContain("<Child bind:this={childRef} {...__attrs} class={__attrs.class} />");
  });
});

describe("MultipleComponentsPerFile: Counter renders sibling <Label>", () => {
  it("Svelte: setter `setCount` is rewritten to a direct assignment in the click handler", async () => {
    // The setter call `setCount(count + 1)` is now rewritten per target — Svelte emits a direct
    // assignment `count = count + 1`, so no undefined `setCount` reference remains.
    const svelte = await compileToAll("MultipleComponentsPerFile", "svelte");
    expect(svelte).toContain("onclick={() => count = count + 1}");
    expect(svelte).not.toContain("setCount");
  });
});

describe("CrossFileBase / CrossFileStyled: cross-file component composition", () => {
  it("Svelte: destructured props feed the cross-file instance (no bare `props`)", async () => {
    const out = await compileTo("CrossFileStyled", "svelte");
    expect(out).toContain(
      'import CrossFileBase, { type CrossFileBaseProps } from "./CrossFileBase.svelte";',
    );
    expect(out).toContain(
      '<CrossFileBase {...__attrs} class={[size, __attrs.class].filter(Boolean).join(" ")} label={label}>',
    );
  });
});
