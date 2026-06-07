// React codegen assertions for the "composition" feature area: components that instantiate other
// components (same-file children, multiple components per file, cross-file imports). These exercise
// the full pipeline (parse → lower → analyze → codegen) so they catch real bugs in how authored
// `.ink.tsx` composition becomes React output.
//
// Focus areas:
//   - component instances resolve to real tags (NOT <unknown>)
//   - attribute fallthrough (`{...__attrs}` / spread) onto the resolved instance

import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";

describe("ComponentRef: same-file child instance + forwarded ref", () => {
  it("React: <Child> resolves to a real tag (not <unknown>) with ref + fallthrough", async () => {
    const out = await compileToAll("ComponentRef", "react");
    expect(out).toContain("<Child {...__attrs} className={props.className} ref={childRef} />");
    expect(out).not.toContain("<unknown");
  });
});

describe("MultipleComponentsPerFile: Counter renders sibling <Label>", () => {
  it("React: <Label> resolves to a real tag with prop binding (not <unknown>)", async () => {
    const out = await compileToAll("MultipleComponentsPerFile", "react");
    expect(out).toContain("<Label text={String(count)} />");
    expect(out).not.toContain("<unknown");
  });
});

describe("Composite: signal setters dropped from non-React event handlers", () => {
  it("React: setX/setY are real bindings from useState", async () => {
    const out = await compileTo("Composite", "react");
    expect(out).toContain("const [x, setX] = useState(1)");
    expect(out).toContain("onClick={() => setX(x + 1)}");
  });
});

describe("CrossFileBase / CrossFileStyled: cross-file component composition", () => {
  it("React: imported <CrossFileBase> resolves to a real tag with merged class + fallthrough", async () => {
    const out = await compileTo("CrossFileStyled", "react");
    expect(out).toContain('import { CrossFileBase } from "./CrossFileBase";');
    expect(out).toContain(
      '<CrossFileBase {...__attrs} className={[props.size, props.className].filter(Boolean).join(" ")} label={props.label}>',
    );
    expect(out).not.toContain("<unknown");
  });

  it("React: Base component default slot falls back to the label prop", async () => {
    const react = await compileTo("CrossFileBase", "react");
    expect(react).toContain("{props.children ?? props.label}");
  });
});
