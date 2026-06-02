// Real-world codegen assertions for the "loops" feature area: author `.ink.tsx` with `<For>` /
// native `.map()` → compile through the full pipeline → assert the ACTUAL generated framework code.
// Focus: list rendering, keys/track wiring, and nested iteration across all 7 targets.
//
// Assertions pin the real emitted text verbatim, so they double as a regression guard on the
// key/track lowering, setter wiring, and per-target quoting rules.

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

describe("ForLoop: <For each> with a string key extractor", () => {
  it('Vue: native v-for with the key extractor reduced to `:key="item"`', async () => {
    const out = await code("ForLoop", "vue");
    expect(out).toContain('<li v-for="item in items" :key="item">');
    expect(out).toContain("{{ item }}");
  });

  it("Solid: <For each={items()}> with the render callback as a child", async () => {
    const out = await code("ForLoop", "solid");
    expect(out).toContain("<For each={items()}>");
    expect(out).toContain("{(item) => <li>{item}</li>}");
  });

  it("Svelte: {#each ... as item (item)} keyed block reads $state", async () => {
    const out = await code("ForLoop", "svelte");
    expect(out).toContain('let items = $state(["Apple", "Banana", "Cherry"])');
    expect(out).toContain("{#each items as item (item)}");
    expect(out).toContain("{/each}");
  });

  it("React: maps over the signal value, key is the extracted value from the key extractor", async () => {
    const out = await code("ForLoop", "react");
    expect(out).toContain("{items.map((item) => (");
    // The React <For> lowering applies the key extractor to produce the per-row key value, so the
    // emitted React `key` is the extracted value `item` (wrapped in a keyed React.Fragment), not the
    // raw extractor function.
    expect(out).toContain("<React.Fragment key={item}>");
  });

  it("Astro: declares the signal state as a plain `let` in the frontmatter and maps it in the template", async () => {
    const out = await code("ForLoop", "astro");
    // The Astro target now declares signal state as `let items = <initial>` in the frontmatter, so the
    // `items.map(...)` reference in the template resolves at SSR instead of throwing a ReferenceError.
    expect(out).toContain('let items = ["Apple", "Banana", "Cherry"]');
    expect(out).toContain("{items.map((item) => (");
  });
});

describe("MapInExpression: native .map() with a literal `key` prop (no <For>)", () => {
  it("React: literal key prop is preserved correctly (contrast with <For>)", async () => {
    const out = await code("MapInExpression", "react");
    // Native .map with `key={t}` is lowered correctly — proves the <For> key bug above is specific
    // to the <For> lowering, not React keys in general.
    expect(out).toContain(
      "{tags.map((t) => (<React.Fragment key={t}><span>{t}</span></React.Fragment>))}",
    );
  });

  it("Angular: native .map becomes @for with `track t` (the extracted value, not a function)", async () => {
    const out = await code("MapInExpression", "angular");
    expect(out).toContain("@for (t of tags(); track t) {");
    // String literals in Angular state initializers are single-quoted.
    expect(out).toContain("tags = signal(['a', 'b', 'c'])");
  });

  it("Qwik: maps over `.value` and wraps each row in a fragment", async () => {
    const out = await code("MapInExpression", "qwik");
    expect(out).toContain("{tags.value.map((t) => (<><span>{t}</span></>))}");
  });
});

describe("NestedLoops: <For> inside <For> with index key extractors", () => {
  it("Vue: nested v-for, inner iterates the outer row binding", async () => {
    const out = await code("NestedLoops", "vue");
    expect(out).toContain('<div v-for="(row, i) in grid" :key="i">');
    expect(out).toContain('<span v-for="(cell, j) in row" :key="j">');
  });

  it("Solid: nested <For>, inner each={row} closes over the outer callback param", async () => {
    const out = await code("NestedLoops", "solid");
    expect(out).toContain("<For each={grid()}>");
    expect(out).toContain("<For each={row}>{(cell, j) => <span>{cell}</span>}</For>");
  });

  it("Svelte: nested keyed {#each} blocks with index keys", async () => {
    const out = await code("NestedLoops", "svelte");
    expect(out).toContain("{#each grid as row, i (i)}");
    expect(out).toContain("{#each row as cell, j (j)}");
  });

  it("Angular: nested @for `track` uses the extracted index with a `let i = $index` binding", async () => {
    const out = await code("NestedLoops", "angular");
    // The index key extractor `(_, i) => i` is reduced to the tracking expression `i`, and Angular's
    // index binding `let i = $index` is added so `track i` resolves. Same at the inner level with `j`.
    expect(out).toContain("@for (row of grid(); track i; let i = $index) {");
    expect(out).toContain("@for (cell of row; track j; let j = $index) {");
  });

  it("React: nested maps, both keys are the extracted index values", async () => {
    const out = await code("NestedLoops", "react");
    // The index key extractors `(_, i) => i` / `(_, j) => j` are reduced to the extracted values, so
    // the keyed React.Fragments use `key={i}` and `key={j}` at both nesting levels.
    expect(out).toContain("{grid.map((row, i) => (");
    expect(out).toContain("<React.Fragment key={i}>");
    expect(out).toContain("<React.Fragment key={j}>");
  });
});

describe("DynamicList: <For> driven by mutable state + event handlers", () => {
  it("Svelte: keyed {#each} over $state list, indexed key", async () => {
    const out = await code("DynamicList", "svelte");
    expect(out).toContain("let items = $state([])");
    expect(out).toContain("{#each items as item, i (i)}");
  });

  it("Qwik: list-add handler is single-wrapped in $() with setters rewritten to .value", async () => {
    const out = await code("DynamicList", "qwik");
    // The list maps over `.value` (fine):
    expect(out).toContain("{items.value.map((item, i) => (<><li>{item}</li></>))}");
    // Event handler is single-wrapped: `$(() => <handler>)` and the setters are rewritten to
    // direct `.value` assignments for Qwik signals.
    expect(out).toContain(
      'onClick={$(() => { items.value = [...items.value, input.value]; input.value = ""; })}',
    );
    expect(out).toContain("onInput={$(e => input.value = e.target.value)}");
  });

  it("Angular: @for tracks the extracted index, setters wired to signal.set with single-quoted literals", async () => {
    const out = await code("DynamicList", "angular");
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
  it("Solid: <For each={items()}> with sibling button that appends via setItems", async () => {
    const out = await code("List", "solid");
    expect(out).toContain("<For each={items()}>");
    expect(out).toContain('onclick={() => setItems([...items(), "C"])}');
  });

  it("Angular: click handler wired to items.set with a single-quoted literal that survives the binding", async () => {
    const out = await code("List", "angular");
    // The setter is wired to `items.set(...)` as a statement binding (no arrow), and the appended
    // string literal is single-quoted (`'C'`) so it stays inside the double-quoted Angular binding.
    expect(out).toContain("(click)=\"items.set([...items(), 'C'])\"");
    // `track` uses the extracted key expression `item` (not the raw `item => item` arrow).
    expect(out).toContain("@for (item of items(); track item) {");
  });

  it("Astro: declares the list as a frontmatter `let` and rewrites the setter to a direct assignment", async () => {
    const out = await code("List", "astro");
    // Signal state is declared as a plain frontmatter `let`, and the template maps over it at SSR.
    expect(out).toContain('let items = ["A", "B"]');
    expect(out).toContain("{items.map((item) => (");
    // The setter `setItems([...items, "C"])` is rewritten to a direct assignment for Astro.
    expect(out).toContain('items = [...items, "C"]');
  });
});
