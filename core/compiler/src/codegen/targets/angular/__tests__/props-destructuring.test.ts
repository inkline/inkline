// Angular codegen for `const { label: text, size: dimension = "md", tone } = props` in the setup
// body. Angular props are signal inputs, so every alias must become a CALL on the input named
// after the prop — `label()`, never a bare `text`.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropsDestructured: plain, renamed, and renamed + defaulted props bindings", () => {
  it("Angular: aliases read as signal input calls, and the folded default seeds input()", async () => {
    const out = await compileTo("PropsDestructured", "angular");

    expect(out).not.toContain("text");
    expect(out).not.toContain("dimension");

    // A folded default makes the prop optional, so `size` takes the value form, not input.required.
    expect(out).toContain("label = input.required<string>()");
    expect(out).toContain("size = input<string>('md')");
    expect(out).toContain("tone = input<string>()");

    expect(out).toContain('<h1 [attr.title]="(label()) ?? null">{{ label() }}</h1>');
    expect(out).toContain("<p>{{ size() }}</p>");
    expect(out).toContain("<span>{{ tone() }}</span>");
  });
});

// The counterpart of the memo limitation: the default seeds `input()`, the only declaration of
// the prop, so a read inside a computed or an effect resolves to it.
describe("PropsDestructuredMemo: an alias inside a computed or an effect keeps the folded default", () => {
  it("Angular: the seeded input() carries the default, so the computed and the effect read it", async () => {
    const out = await compileTo("PropsDestructuredMemo", "angular");

    expect(out).toContain("size = input<string>('md')");
    expect(out).toContain("summary = computed(() => `${this.label()}:${this.size()}`)");
    expect(out).toContain("effect(() => { console.log(this.size()); })");
  });
});
