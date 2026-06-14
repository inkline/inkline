// Angular codegen assertions for the "composition" feature area: components that instantiate other
// components (same-file children, multiple components per file, cross-file imports). These exercise
// the full pipeline (parse → lower → analyze → codegen) so they catch real bugs in how authored
// `.ink.tsx` composition becomes Angular standalone-component output.

import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";

describe("ComponentRef: same-file child instance + forwarded ref", () => {
  it("Angular: child renders via its ink-* selector and IS declared in imports", async () => {
    const out = await compileToAll("ComponentRef", "angular");
    // The same-file sibling compiles to its own module; the parent imports it and lists it in the
    // standalone `imports` (otherwise Angular treats the tag as an unknown element).
    expect(out).toContain('import { ChildComponent as Child } from "./Child.component";');
    expect(out).toContain("imports: [Child]");
    expect(out).toContain("<ink-child");
    expect(out).not.toContain("<Child></Child>");
  });
});

describe("MultipleComponentsPerFile: Counter renders sibling <Label>", () => {
  it("Angular: Label is imported from its sibling module and declared in imports[]", async () => {
    const out = await compileToAll("MultipleComponentsPerFile", "angular");
    expect(out).toContain('import { LabelComponent as Label } from "./Label.component";');
    expect(out).toContain("imports: [Label]");
    expect(out).toContain('<ink-label [text]="String(count())"></ink-label>');
    expect(out).toContain("selector: 'ink-counter'");
  });
});

describe("CrossFileBase / CrossFileStyled: cross-file component composition", () => {
  it("Angular: cross-file child IS correctly declared in imports[] (alias form)", async () => {
    const out = await compileTo("CrossFileStyled", "angular");
    expect(out).toContain(
      'import { CrossFileBaseComponent as CrossFileBase } from "./CrossFileBase.component";',
    );
    expect(out).toContain("imports: [CrossFileBase]");
    // A class passed to a compiled child travels through its `klass` input (Ivy never routes
    // `[class]` bindings to inputs), and the styled root merges the class it receives itself.
    expect(out).toContain(
      "<ink-cross-file-base [klass]=\"(size()) + (klass() ? ' ' + klass() : '')\" [label]=\"label()\">",
    );
  });

  it("Base component default slot falls back to the label prop", async () => {
    const angular = await compileTo("CrossFileBase", "angular");
    // Angular renders the fallback (the `label` signal input) as the <ng-content> projection default.
    expect(angular).toContain("<ng-content>{{ label() }}</ng-content>");
  });

  it("Base component root merges the parent-forwarded klass with its own class", async () => {
    const angular = await compileTo("CrossFileBase", "angular");
    expect(angular).toContain("klass = input<string>()");
    expect(angular).toMatch(/\[class\]="'[^']+' \+ \(klass\(\) \? ' ' \+ klass\(\) : ''\)"/);
  });
});
