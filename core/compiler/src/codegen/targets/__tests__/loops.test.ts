// Real-world codegen assertions for the "loops" feature area: author `.ink.tsx` with `<For>` /
// native `.map()` → compile through the full pipeline → assert the ACTUAL generated framework code.
// Focus: list rendering, keys/track wiring, and nested iteration across all 7 targets.
//
// Several assertions below document CURRENTLY BROKEN output and are marked `// BUG:`. They assert the
// real emitted text (so the suite stays green) while pinning the defect for follow-up.

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

  it("React: maps over the signal value, but the key is the raw key-extractor function", async () => {
    const out = await code("ForLoop", "react");
    expect(out).toContain("{items.map((item) => (");
    // BUG: the React <For> lowering emits the key *extractor* verbatim as the React `key`, so every
    // row gets `key={item => item}` (a function) instead of `key={item}`. React keys must be the
    // extracted value; a function key coerces to "item => item" for every row → duplicate keys.
    expect(out).toContain("key={item => item}");
  });

  it("Astro: BUG — `items` signal is dropped from frontmatter but referenced in the template", async () => {
    const out = await code("ForLoop", "astro");
    // BUG: the Astro target never emits the `createSignal(["Apple",...])` declaration, yet the
    // template still does `items.map(...)`. `items` is undefined at SSR → ReferenceError.
    expect(out).toContain("{items.map((item) => (");
    expect(out).not.toContain("Apple"); // the signal initializer is entirely missing
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
    expect(out).toContain('tags = signal(["a", "b", "c"])');
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

  it("Angular: BUG — nested @for `track` is the raw arrow extractor, not the index", async () => {
    const out = await code("NestedLoops", "angular");
    // BUG: the index key extractor `(_, i) => i` is emitted verbatim into Angular's `track` clause.
    // Angular `track` expects a tracking expression (e.g. `i`), not a function literal → template
    // compile error.
    expect(out).toContain("@for (row of grid(); track (_, i) => i) {");
    expect(out).toContain("@for (cell of row; track (_, j) => j) {");
  });

  it("React: nested maps, both keys are raw extractor functions", async () => {
    const out = await code("NestedLoops", "react");
    // BUG: same <For> key defect as ForLoop, now at both nesting levels.
    expect(out).toContain("{grid.map((row, i) => (");
    expect(out).toContain("key={(_, i) => i}");
    expect(out).toContain("key={(_, j) => j}");
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

  it("Angular: BUG — @for track is the raw index extractor + unescaped quotes in the binding", async () => {
    const out = await code("DynamicList", "angular");
    // BUG: `(item, i) => i` leaks into Angular's track clause instead of `i`.
    expect(out).toContain("@for (item of items(); track (item, i) => i) {");
    // Setters are now wired: the block handler becomes statements with the setter rewritten to
    // `signal.set(...)` and the param mapped to `$event`.
    // BUG: the inner string literal `""` is emitted unescaped inside the double-quoted Angular
    // binding, so the attribute terminates early and the template is malformed.
    expect(out).toContain('(click)="items.set([...items(), input()]); input.set("")"');
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

  it("Angular: BUG — string literal in click handler breaks the double-quoted attribute", async () => {
    const out = await code("List", "angular");
    // The setter is now wired to `items.set(...)` as a statement binding (no arrow).
    // BUG: the handler is placed inside a double-quoted Angular binding `(click)="..."`, but its
    // `"C"` is not escaped, so the attribute terminates early and the template is malformed.
    expect(out).toContain('(click)="items.set([...items(), "C"])"');
    expect(out).toContain("@for (item of items(); track item => item) {");
  });

  it("Astro: BUG — `items` signal dropped from frontmatter; setters undefined too", async () => {
    const out = await code("List", "astro");
    // BUG: same Astro state-drop as ForLoop. Template references `items` and `setItems`, neither of
    // which exists in the frontmatter.
    expect(out).toContain("{items.map((item) => (");
    expect(out).not.toContain('$state(["A", "B"])');
    expect(out).not.toContain("signal");
  });
});
