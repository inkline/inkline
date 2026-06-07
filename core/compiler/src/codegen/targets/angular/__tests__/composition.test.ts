// Angular codegen assertions for the "composition" feature area: components that instantiate other
// components (same-file children, multiple components per file, cross-file imports). These exercise
// the full pipeline (parse → lower → analyze → codegen) so they catch real bugs in how authored
// `.ink.tsx` composition becomes Angular standalone-component output.

import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";

describe("ComponentRef: same-file child instance + forwarded ref", () => {
  it("Angular: child instance resolves to <Child></Child> but is NOT declared in imports", async () => {
    const out = await compileToAll("ComponentRef", "angular");
    expect(out).toContain("template: `<Child></Child>`");
    // BUG: the ComponentRef @Component has no `imports: [...]`, yet its template uses <Child>.
    // Angular standalone components must list child components in `imports` or the tag is unknown.
    expect(out).toContain("selector: 'ComponentRef', template: `<Child></Child>`");
    expect(out).not.toContain("imports: [Child");
  });
});

describe("MultipleComponentsPerFile: Counter renders sibling <Label>", () => {
  it("Angular: Label instance is emitted but missing from imports[]", async () => {
    const out = await compileToAll("MultipleComponentsPerFile", "angular");
    expect(out).toContain('<Label [text]="String(count())"></Label>');
    // BUG: Counter's @Component omits `imports: [Label]` even though the template instantiates
    // <Label>. Standalone Angular requires the child in imports for the tag to render.
    expect(out).toContain("selector: 'Counter', template: `<div>");
    expect(out).not.toContain("imports: [Label");
  });
});

describe("CrossFileBase / CrossFileStyled: cross-file component composition", () => {
  it("Angular: cross-file child IS correctly declared in imports[] (alias form)", async () => {
    const out = await compileTo("CrossFileStyled", "angular");
    expect(out).toContain(
      'import { CrossFileBaseComponent as CrossFileBase } from "./CrossFileBase.component";',
    );
    expect(out).toContain("imports: [CrossFileBase]");
    // Styling/label props are signal inputs, read in call form in the template bindings.
    expect(out).toContain('<CrossFileBase [class]="size()" [label]="label()">');
  });

  it("Base component default slot falls back to the label prop", async () => {
    const angular = await compileTo("CrossFileBase", "angular");
    // Angular renders the fallback (the `label` signal input) as the <ng-content> projection default.
    expect(angular).toContain("<ng-content>{{ label() }}</ng-content>");
  });
});
