// React codegen assertions for the "attribute fallthrough" feature area: how an inherited
// class/className and rest attributes are merged onto a component's host-element root.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("attribute fallthrough", () => {
  it("React merges an inherited className onto a host-element root (CrossFileBase)", async () => {
    const code = await compileTo("CrossFileBase", "react");
    expect(code).toContain("const { children, label, ...__attrs } = props");
    expect(code).toContain(
      '<div {...__attrs} className={["base", props.className].filter(Boolean).join(" ")}>',
    );
    expect(code).toContain("React.HTMLAttributes<HTMLElement>");
  });

  it("React chains fallthrough through a styled wrapper's component root (CrossFileStyled)", async () => {
    const code = await compileTo("CrossFileStyled", "react");
    expect(code).toContain("...__attrs } = props");
    expect(code).toContain('className={[props.size, props.className].filter(Boolean).join(" ")}');
  });

  it("emits no fallthrough wiring for a fragment-root component (FragmentRoot)", async () => {
    const code = await compileTo("FragmentRoot", "react");
    expect(code, "react fragment root").not.toContain("__attrs");
  });
});
