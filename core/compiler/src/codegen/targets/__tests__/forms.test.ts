import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

// ---------------------------------------------------------------------------
// React + Solid wire two-way bindings correctly: signal state, value/checked
// reads, and a setter the handler can actually call.
// ---------------------------------------------------------------------------

describe("TwoWayCheckbox: checked binding + onChange", () => {
  it("React: useState boolean, checked={checked}, setter toggles", async () => {
    const out = await code("TwoWayCheckbox", "react");
    expect(out).toContain("const [checked, setChecked] = useState(false)");
    expect(out).toContain(
      `<input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />`,
    );
  });

  it("Solid: createSignal, checked reads checked(), onchange calls setter()", async () => {
    const out = await code("TwoWayCheckbox", "solid");
    expect(out).toContain("const [checked, setChecked] = createSignal(false)");
    expect(out).toContain(
      `<input type="checkbox" checked={checked()} onchange={() => setChecked(!checked())} />`,
    );
  });
});

describe("TwoWayNumber: value binding + onInput coercion", () => {
  it("React: value={value}, onInput coerces with Number(e.target.value)", async () => {
    const out = await code("TwoWayNumber", "react");
    expect(out).toContain("const [value, setValue] = useState(0)");
    expect(out).toContain(
      `<input type="number" value={value} onInput={e => setValue(Number(e.target.value))} />`,
    );
  });

  it("Solid: value reads value(), oninput lowercased, setter coerces", async () => {
    const out = await code("TwoWayNumber", "solid");
    expect(out).toContain(
      `<input type="number" value={value()} oninput={e => setValue(Number(e.target.value))} />`,
    );
  });
});

describe("ControlledSelect / ControlledTextarea / FormField: value + change/input", () => {
  it("React: select keeps value + onChange and renders all options", async () => {
    const out = await code("ControlledSelect", "react");
    expect(out).toContain(`value={value}`);
    expect(out).toContain(`onChange={e => setValue(e.target.value)}`);
    expect(out).toContain(`<option value="a">`);
  });

  it("React: textarea value + onInput, text().length flattened to text.length", async () => {
    const out = await code("ControlledTextarea", "react");
    expect(out).toContain(`<textarea value={text} onInput={e => setText(e.target.value)} />`);
    expect(out).toContain("{text.length}");
  });

  it("Solid: FormField input reads value() and oninput calls setValue", async () => {
    const out = await code("FormField", "solid");
    expect(out).toContain(`<input value={value()} oninput={e => setValue(e.target.value)} />`);
    expect(out).toContain("{value()}");
  });
});

// ---------------------------------------------------------------------------
// State setters are now wired per target. The two-way binding mutation path is
// rewritten into the idiomatic form for each framework: Vue template `x = v`
// (with .value stripped in template), Svelte reassignment, Angular `x.set(v)`,
// Qwik `x.value = v`. The handler no longer references an undefined setter.
// ---------------------------------------------------------------------------

describe("Vue: model setter is rewritten to template assignment", () => {
  it("<script setup> declares ref; @change mutates it via template assignment", async () => {
    const out = await code("TwoWayCheckbox", "vue");
    // ref is declared...
    expect(out).toContain("const checked = ref(false)");
    // ...and there is no undefined `setChecked` in scope.
    expect(out).not.toContain("setChecked =");
    expect(out).not.toContain("function setChecked");
    // Handler mutates the ref directly (template strips .value, Vue re-adds it).
    expect(out).toContain(`@change="() => checked = !checked"`);
  });

  it("number input handler mutates ref via template assignment", async () => {
    const out = await code("TwoWayNumber", "vue");
    expect(out).toContain("const value = ref(0)");
    expect(out).toContain(`@input="e => value = Number(e.target.value)"`);
    expect(out).not.toContain("const setValue");
  });
});

describe("Svelte: $state setter rewritten to reassignment", () => {
  it("onchange mutates `let checked = $state(...)` via reassignment", async () => {
    const out = await code("TwoWayCheckbox", "svelte");
    expect(out).toContain("let checked = $state(false)");
    // Svelte mutates via reassignment, not an undefined setter.
    expect(out).toContain(`onchange={() => checked = !checked}`);
    expect(out).not.toContain("setChecked");
  });

  it("textarea oninput mutates state via reassignment", async () => {
    const out = await code("ControlledTextarea", "svelte");
    expect(out).toContain(`let text = $state("")`);
    expect(out).toContain(`oninput={e => text = e.target.value}`);
    expect(out).not.toContain("function setText");
  });
});

describe("Angular: signal setter rewritten to signal.set()", () => {
  it("(change) handler calls the signal's .set() as a statement", async () => {
    const out = await code("TwoWayCheckbox", "angular");
    expect(out).toContain("checked = signal(false)");
    // Event binding is a statement that mutates the signal via .set().
    expect(out).toContain(`(change)="checked.set(!checked())"`);
    // No undefined setChecked declaration exists in the class body.
    expect(out).not.toContain("setChecked");
  });

  it("(input) handler calls signal.set() with $event mapped from the param", async () => {
    const out = await code("FormField", "angular");
    expect(out).toContain(`value = signal("")`);
    expect(out).toContain(`(input)="value.set($event.target.value)"`);
  });
});

describe("Qwik: handler single-wrapped + signal.value setter", () => {
  it("onInput is single-wrapped `$(e => value.value = ...)`", async () => {
    const out = await code("FormField", "qwik");
    expect(out).toContain('const value = useSignal("")');
    // Single $() wrap, param preserved, mutation via signal.value.
    expect(out).toContain(`onInput={$(e => value.value = e.target.value)}`);
  });

  it("checkbox onChange single-wrapped `$(() => checked.value = ...)`", async () => {
    const out = await code("TwoWayCheckbox", "qwik");
    expect(out).toContain(`onChange={$(() => checked.value = !checked.value)}`);
  });
});

describe("Astro: signal state + handlers dropped entirely", () => {
  it("BUG: template reads undeclared `value`; frontmatter only has __attrs", async () => {
    const out = await code("FormField", "astro");
    // Frontmatter declares props/__attrs but never the `value` signal.
    expect(out).toContain("const { ...__attrs } = props;");
    expect(out).not.toContain("const value");
    // BUG: template references `value` and `setValue`, neither of which exists.
    expect(out).toContain(`<input value={value} onInput={e => setValue(e.target.value)} />`);
    expect(out).toContain("{value}");
  });

  it("BUG: checkbox template references undeclared `checked` and `setChecked`", async () => {
    const out = await code("TwoWayCheckbox", "astro");
    expect(out).not.toContain("const checked");
    expect(out).toContain(
      `<input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />`,
    );
  });
});
