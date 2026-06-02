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
// BUG SURFACE: every non-React/Solid target drops the setter half of the
// two-way binding. The emitted event handlers call setChecked/setValue/setText
// which are never declared in the target's scope, so two-way binding is dead
// at runtime across Vue, Svelte, Angular, Qwik and Astro.
// ---------------------------------------------------------------------------

describe("Vue: model setter is never emitted", () => {
  it("BUG: <script setup> declares ref but no setter the handler calls", async () => {
    const out = await code("TwoWayCheckbox", "vue");
    // ref is declared...
    expect(out).toContain("const checked = ref(false)");
    // ...but the only mutation path is an undefined `setChecked`.
    expect(out).not.toContain("setChecked =");
    expect(out).not.toContain("function setChecked");
    // BUG: handler references undefined setChecked; @change never mutates the ref.
    expect(out).toContain(`@change="() => setChecked(!checked)"`);
  });

  it("BUG: number input handler calls undefined setValue", async () => {
    const out = await code("TwoWayNumber", "vue");
    expect(out).toContain("const value = ref(0)");
    // BUG: setValue is never defined in the script block.
    expect(out).toContain(`@input="e => setValue(Number(e.target.value))"`);
    expect(out).not.toContain("const setValue");
  });
});

describe("Svelte: $state has no setter, handler references undefined fn", () => {
  it("BUG: onchange calls setChecked but only `let checked = $state(...)` exists", async () => {
    const out = await code("TwoWayCheckbox", "svelte");
    expect(out).toContain("let checked = $state(false)");
    // BUG: setChecked is never declared; Svelte would mutate via reassignment.
    expect(out).toContain(`onchange={() => setChecked(!checked)}`);
    expect(out).not.toContain("setChecked =");
  });

  it("BUG: textarea oninput calls undefined setText", async () => {
    const out = await code("ControlledTextarea", "svelte");
    expect(out).toContain(`let text = $state("")`);
    expect(out).toContain(`oninput={e => setText(e.target.value)}`);
    expect(out).not.toContain("function setText");
  });
});

describe("Angular: class body has signal but no setter method", () => {
  it("BUG: (change) handler calls setChecked() absent from the component class", async () => {
    const out = await code("TwoWayCheckbox", "angular");
    expect(out).toContain("checked = signal(false)");
    // BUG: template calls setChecked() which is not a member of the class.
    expect(out).toContain(`(change)="() => setChecked(!checked())"`);
    // No setChecked declaration exists in the class body (only the signal).
    expect(out).not.toContain("setChecked = ");
  });

  it("BUG: (input) handler calls undefined setValue", async () => {
    const out = await code("FormField", "angular");
    expect(out).toContain(`value = signal("")`);
    expect(out).toContain(`(input)="e => setValue(e.target.value)"`);
  });
});

describe("Qwik: handler double-wrapped + undefined setter", () => {
  it("BUG: onInput wraps `() => e => ...` so the inner handler never fires", async () => {
    const out = await code("FormField", "qwik");
    expect(out).toContain('const value = useSignal("")');
    // BUG: extra arrow layer — $(() => e => setValue(...)) returns a function
    // instead of running it; also setValue is never defined.
    expect(out).toContain(`onInput={$(() => e => setValue(e.target.value))}`);
  });

  it("BUG: checkbox onChange double-wrapped to `$(() => () => setChecked(...))`", async () => {
    const out = await code("TwoWayCheckbox", "qwik");
    expect(out).toContain(`onChange={$(() => () => setChecked(!checked.value))}`);
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
