// Qwik codegen for `const { label: text, size: dimension = "md", tone } = props` in the setup
// body. Qwik keeps reads on the props object, except for a prop carrying a default, which it
// destructures so the default takes effect.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropsDestructured: plain, renamed, and renamed + defaulted props bindings", () => {
  it("Qwik: aliases read props.<prop>, and the defaulted one reads its destructured local", async () => {
    const out = await compileTo("PropsDestructured", "qwik");

    expect(out).not.toContain("text");
    expect(out).not.toContain("dimension");

    expect(out).toContain('const { size = "md" } = props');
    expect(out).toContain("<h1 title={props.label}>{props.label}</h1>");
    expect(out).toContain("<p>{size}</p>");
    expect(out).toContain("<span>{props.tone}</span>");
  });
});

// The one accepted limitation, pinned. Qwik applies a folded default with a rest destructure
// emitted below the memos and tasks, so an alias read inside one cannot resolve to that local
// without a temporal-dead-zone reference. It resolves to `props.<prop>` instead, which is
// `undefined` when the caller omits the prop. This is what a declared default already does when
// read as `props.size` inside a memo — the alias inherits it rather than introducing it.
describe("PropsDestructuredMemo: an alias inside a memo or a task drops the folded default", () => {
  it("Qwik: the memo and the task read props.size; only the render body gets the default", async () => {
    const out = await compileTo("PropsDestructuredMemo", "qwik");

    expect(out).toContain("const summary = useComputed$(() => `${props.label}:${props.size}`)");
    expect(out).toContain("useVisibleTask$(() => { console.log(props.size); })");

    // The default lives on the render-body local, declared after both.
    expect(out).toContain('const { size = "md" } = props');
    expect(out).toContain("<p>{size}</p>");
    expect(out.indexOf("useComputed$")).toBeLessThan(out.indexOf('const { size = "md" } = props'));
  });
});
