// Real-world codegen assertions for the "props" feature area (Solid target): prop declaration +
// types via splitProps, required props, and fragment roots. These exercise the FULL pipeline
// (parse -> lower -> analyze -> codegen) so they catch real bugs in how authored props and root
// shapes become Solid output.

import { describe, it, expect } from "vitest";
import { compileTo, compileToChecked } from "../../../../testing/codegen.ts";

// The full object form used to read `type:` through `ts.isTypeNode`, which a constructor
// `Identifier` never satisfies — so the key was dropped and every prop below emitted untyped. `cfg`
// covers the other half: an object literal is only a shape when every key is one the shape reads,
// otherwise it is a default value, and routing it into the shape dropped its type AND its default.
describe("PropTypeShapes: full object form vs. an object literal default", () => {
  it("Solid: the props parameter carries the declared types and mergeProps seeds the object default", async () => {
    const out = await compileToChecked("PropTypeShapes", "solid");
    expect(out).toContain(
      "function PropTypeShapes(_props: { size?: number; label: string; when?: Date; count: number; cfg?: Record<string, any> } & JSX.HTMLAttributes<HTMLElement>)",
    );
    expect(out).toContain("const props = mergeProps({ count: 0, cfg: { a: 1 } }, _props)");
  });
});

describe("IButton: typed props (label/optional disabled)", () => {
  it("Solid: splitProps lists the declared prop keys so __attrs is the remainder", async () => {
    const out = await compileTo("IButton", "solid");
    expect(out).toContain('const [, __attrs] = splitProps(props, ["label", "disabled"])');
    expect(out).toContain("<button {...__attrs} disabled={props.disabled} class={props.class}>");
  });
});

describe("RequiredProps: non-optional props (name/age)", () => {
  it("Solid: required props keep non-optional intersection-type members", async () => {
    const solid = await compileTo("RequiredProps", "solid");
    expect(solid).toContain('const [, __attrs] = splitProps(props, ["name", "age"])');
    expect(solid).toContain("{props.name}");
  });
});

describe("FragmentRoot: `<>...</>` root with no props", () => {
  it("Solid: fragment root emits a real `<>...</>` fragment", async () => {
    const solid = await compileTo("FragmentRoot", "solid");
    expect(solid).toContain("<>");
  });
});
