// Solid codegen assertions for the "composition" feature area: components that instantiate other
// components (same-file children, multiple components per file). These exercise the full pipeline
// (parse → lower → analyze → codegen) so they catch real bugs in how authored `.ink.tsx`
// composition becomes Solid output (resolved tags, callback refs, signal call form).

import { describe, it, expect } from "vitest";
import { compileToAll } from "../../../../testing/codegen.ts";

describe("ComponentRef: same-file child instance + forwarded ref", () => {
  it("Solid: child instance ref is wired via callback ref", async () => {
    const out = await compileToAll("ComponentRef", "solid");
    expect(out).toContain("<Child {...__attrs} class={props.class} ref={(el) => childRef = el} />");
  });
});

describe("MultipleComponentsPerFile: Counter renders sibling <Label>", () => {
  it("Solid: <Label> instance reads the signal via call form", async () => {
    const out = await compileToAll("MultipleComponentsPerFile", "solid");
    expect(out).toContain("<Label text={String(count())} />");
  });
});
