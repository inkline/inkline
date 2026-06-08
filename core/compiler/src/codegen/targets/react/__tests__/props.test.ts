// React codegen assertions for the "props" feature area: prop declaration + intersection types, the
// object form with defaults, required props, fragment roots, and text siblings. These exercise the
// FULL pipeline (parse -> lower -> analyze -> codegen) so they catch real bugs in how authored props
// and root shapes become React output.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("IButton: typed props (label/optional disabled)", () => {
  it("React: destructures into __attrs, keeps an intersection type, binds disabled via props.x", async () => {
    const out = await compileTo("IButton", "react");
    expect(out).toContain(
      "export function IButton(props: { label: string; disabled?: boolean } & React.HTMLAttributes<HTMLElement>)",
    );
    expect(out).toContain("const { label, disabled, ...__attrs } = props");
    expect(out).toContain(
      "<button {...__attrs} disabled={props.disabled} className={props.className}>",
    );
    expect(out).toContain("{props.label}");
  });
});

describe("PropDefaults: object form `{ props: { color: 'blue', size: Number } }`", () => {
  // The author used the object/options form, which conveys a DEFAULT ("blue") for color and a
  // runtime constructor type (Number) for size.
  it("React: resolves prop types and applies the `color` default via the destructure", async () => {
    const out = await compileTo("PropDefaults", "react");
    // Resolved types: `color?: string`, `size: number` (no bare `color?` without an annotation).
    expect(out).toContain(
      "export function PropDefaults(props: { color?: string; size: number } & React.HTMLAttributes<HTMLElement>)",
    );
    // The `"blue"` default is applied in the rest destructure, and the JSX reads the destructured
    // local so an omitted `color` resolves to the default.
    expect(out).toContain('const { color = "blue", size, ...__attrs } = props');
    expect(out).toContain("style={`color: ${color}`}");
  });
});

describe("RequiredProps: non-optional props (name/age)", () => {
  it("React: required props keep non-optional intersection-type members", async () => {
    const react = await compileTo("RequiredProps", "react");
    expect(react).toContain(
      "export function RequiredProps(props: { name: string; age: number } & React.HTMLAttributes<HTMLElement>)",
    );
  });
});

describe("Card: `children` prop + class merge", () => {
  it("React: children renders via props.children and class merges with literal `card`", async () => {
    const out = await compileTo("Card", "react");
    expect(out).toContain('className={["card", props.className].filter(Boolean).join(" ")}');
    expect(out).toContain("{props.children}");
  });
});

describe("FragmentRoot: `<>...</>` root with no props", () => {
  it("React: fragment root emits a real `<>...</>` fragment", async () => {
    const react = await compileTo("FragmentRoot", "react");
    expect(react).toContain("export function FragmentRoot(props: Record<string, never>)");
    expect(react).toContain("<>");
    expect(react).toContain("</>");
  });
});

describe("TextWithSiblings: text nodes adjacent to an element + a signal read", () => {
  it("React: sibling text and <strong>{name}</strong> are preserved around the element", async () => {
    const out = await compileTo("TextWithSiblings", "react");
    expect(out).toContain('const [name, setName] = useState("world")');
    expect(out).toContain("Hello,");
    expect(out).toContain("<strong>");
    expect(out).toContain("{name}");
    expect(out).toContain("!");
  });
});
