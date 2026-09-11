// React codegen for `const { label: text, size: dimension = "md", tone } = props` in the setup
// body. The bindings are aliases of the props they name, so every read must resolve to something
// React declares — never to the bare local, which nothing in the output declares.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropsDestructured: plain, renamed, and renamed + defaulted props bindings", () => {
  it("React: reads each alias through props, and the defaulted one through its destructured local", async () => {
    const out = await compileTo("PropsDestructured", "react");

    // The authored statement never survives: React has its own props convention.
    expect(out).not.toContain("= props;");
    expect(out).not.toContain("text");
    expect(out).not.toContain("dimension");

    // Plain and renamed aliases read the prop directly.
    expect(out).toContain("<h1 title={props.label}>{props.label}</h1>");
    expect(out).toContain("<span>{props.tone}</span>");

    // The default is folded into the prop, which React applies through the rest destructure; the
    // read then goes through that local so an omitted `size` resolves to "md".
    expect(out).toContain('const { size = "md" } = props');
    expect(out).toContain("<p>{size}</p>");
  });
});

// The one accepted limitation, pinned. React applies a folded default with a rest destructure
// emitted below the memos and effects, so an alias read inside one cannot resolve to that local
// without a temporal-dead-zone reference. It resolves to `props.<prop>` instead, which is
// `undefined` when the caller omits the prop. This is what a declared default already does when
// read as `props.size` inside a memo — the alias inherits it rather than introducing it.
describe("PropsDestructuredMemo: an alias inside a memo or an effect drops the folded default", () => {
  it("React: the memo and the effect read props.size; only the render body gets the default", async () => {
    const out = await compileTo("PropsDestructuredMemo", "react");

    expect(out).toContain("const summary = useMemo(() => `${props.label}:${props.size}`, [])");
    expect(out).toContain("useEffect(() => { console.log(props.size); }, [])");

    // The default lives on the render-body local, declared after both.
    expect(out).toContain('const { size = "md" } = props');
    expect(out).toContain("<p>{size}</p>");
    expect(out.indexOf("useMemo")).toBeLessThan(out.indexOf('const { size = "md" } = props'));

    // A destructured local is not tracked as a dependency, so the memo computes once. INK0011
    // reports that at compile time; this pins the emitted consequence.
    expect(out).not.toContain("[props.size]");
  });
});
