// Svelte codegen for `const { label: text, size: dimension = "md", tone } = props` in the setup
// body. Svelte declares props by destructuring `$props()`, so every alias must appear there under
// its PROP name — the authored local is never declared.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropsDestructured: plain, renamed, and renamed + defaulted props bindings", () => {
  it("Svelte: $props() declares every prop, carrying the folded default", async () => {
    const out = await compileTo("PropsDestructured", "svelte");

    expect(out).not.toContain("text");
    expect(out).not.toContain("dimension");

    expect(out).toContain('let { label, size = "md", tone }: PropsDestructuredProps = $props()');
    expect(out).toContain("<h1 title={label}>{label}</h1>");
    expect(out).toContain("<p>{size}</p>");
    expect(out).toContain("<span>{tone}</span>");
  });
});

// The counterpart of the memo limitation: the default sits on the `$props()` destructure, which
// is the only declaration of the name, so a read inside a derived or an effect resolves to it.
describe("PropsDestructuredMemo: an alias inside a derived or an effect keeps the folded default", () => {
  it("Svelte: $props() carries the default, so the derived and the effect read it", async () => {
    const out = await compileTo("PropsDestructuredMemo", "svelte");

    expect(out).toContain('let { label, size = "md" }: PropsDestructuredMemoProps = $props()');
    expect(out).toContain("let summary = $derived(`${label}:${size}`)");
    expect(out).toContain("$effect(() => { console.log(size); })");
  });
});
