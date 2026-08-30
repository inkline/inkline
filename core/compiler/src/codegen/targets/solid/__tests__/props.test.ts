// Real-world codegen assertions for the "props" feature area (Solid target): prop declaration +
// types via splitProps, required props, and fragment roots. These exercise the FULL pipeline
// (parse -> lower -> analyze -> codegen) so they catch real bugs in how authored props and root
// shapes become Solid output.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

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

describe("PropDateType: object form `{ props: { when: Date, size: Number } }`", () => {
  // A bare `Date` declares the prop's type, not a default value — so no `mergeProps` seed.
  it("Solid: `when` is an optional Date and no mergeProps default is emitted", async () => {
    const out = await compileTo("PropDateType", "solid");
    expect(out).toContain(
      "export default function PropDateType(props: { when?: Date; size: number } & JSX.HTMLAttributes<HTMLElement>)",
    );
    expect(out).not.toContain("mergeProps");
  });
});
