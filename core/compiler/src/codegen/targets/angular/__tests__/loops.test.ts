// Angular codegen assertions for the "loops" feature area: author `.ink.tsx` with `<For>` /
// native `.map()` → compile through the full pipeline → assert the ACTUAL generated Angular code.
// Focus: @for/track lowering, $index bindings, and setter wiring with single-quoted literals.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("MapInExpression: native .map() with a literal `key` prop (no <For>)", () => {
  it("Angular: native .map becomes @for with `track t` (the extracted value, not a function)", async () => {
    const out = await compileTo("MapInExpression", "angular");
    expect(out).toContain("@for (t of tags(); track t) {");
    // String literals in Angular state initializers are single-quoted.
    expect(out).toContain("tags = signal(['a', 'b', 'c'])");
  });
});

describe("NestedLoops: <For> inside <For> with index key extractors", () => {
  it("Angular: nested @for `track` uses the extracted index with a `let i = $index` binding", async () => {
    const out = await compileTo("NestedLoops", "angular");
    // The index key extractor `(_, i) => i` is reduced to the tracking expression `i`, and Angular's
    // index binding `let i = $index` is added so `track i` resolves. Same at the inner level with `j`.
    expect(out).toContain("@for (row of grid(); track i; let i = $index) {");
    expect(out).toContain("@for (cell of row; track j; let j = $index) {");
  });
});

describe("DynamicList: <For> driven by mutable state + event handlers", () => {
  it("Angular: @for tracks the extracted index, setters wired to signal.set with single-quoted literals", async () => {
    const out = await compileTo("DynamicList", "angular");
    // The index key extractor `(item, i) => i` is reduced to `i`, with the `let i = $index` binding.
    expect(out).toContain("@for (item of items(); track i; let i = $index) {");
    // Setters are wired: the block handler becomes statements with the setter rewritten to
    // `signal.set(...)` and the param mapped to `$event`. The reset literal is single-quoted (`''`)
    // so it no longer breaks out of the double-quoted Angular binding.
    expect(out).toContain('(input)="input.set($event.target.value)"');
    expect(out).toContain("(click)=\"items.set([...items(), input()]); input.set('')\"");
    const classBody = out.slice(out.indexOf("export class DynamicListComponent"));
    expect(classBody).toContain("items = signal([])");
    expect(classBody).not.toContain("setItems");
  });
});

describe("List: <For> alongside a mutating button", () => {
  it("Angular: click handler wired to items.set with a single-quoted literal that survives the binding", async () => {
    const out = await compileTo("List", "angular");
    // The setter is wired to `items.set(...)` as a statement binding (no arrow), and the appended
    // string literal is single-quoted (`'C'`) so it stays inside the double-quoted Angular binding.
    expect(out).toContain("(click)=\"items.set([...items(), 'C'])\"");
    // `track` uses the extracted key expression `item` (not the raw `item => item` arrow).
    expect(out).toContain("@for (item of items(); track item) {");
  });
});
