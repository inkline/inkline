// Real-DOM verification of the Angular target: compile a styled + headless component pair through
// the real pipeline, SSR it via @angular/platform-server, and assert the rendered HTML — recipe
// classes merged onto the headless root (not stranded on the host element), content projection,
// slot fills, and signal-input props.

import { describe, it, expect } from "vitest";
import { compileSource } from "./compile.ts";
import { mountForTarget } from "./mount.ts";
import { analyzeOnly, buildAngularRegistry, type GeneratedFile } from "@inkline/compiler";

// A same-file styled + headless pair mirroring the Badge pattern (headless root carries the base
// class; the styled wrapper computes a recipe class and forwards it via the `class` attribute).
const STYLED_PAIR = `
import { defineComponent, Slot, createMemo } from "@inkline/core";
import { badgeRecipe, type BadgeRecipeProps } from "virtual:styleframe";

interface BadgeBaseProps {
  label?: string;
}
const BadgeBase = defineComponent({ slots: { default: {} } }, (props: BadgeBaseProps) => {
  return (
    <div class="badge">
      <Slot>{props.label}</Slot>
    </div>
  );
});

interface BadgeProps extends BadgeBaseProps {
  color?: "primary" | "secondary";
}
const Badge = defineComponent({ slots: { default: {} } }, (props: BadgeProps) => {
  const className = createMemo(() => badgeRecipe({ color: props.color }));
  // The label fallback lives on the styled wrapper's <Slot> (mirroring the real IBadge): the
  // wrapper's pass-through projection statically fills the base's slot in Angular, so a fallback
  // declared only on the base would never show.
  return (
    <BadgeBase class={className()}>
      <Slot>{props.label}</Slot>
    </BadgeBase>
  );
});
export default Badge;
`;

async function compileAngular(source: string): Promise<{
  entry: GeneratedFile;
  supporting: readonly GeneratedFile[];
}> {
  const result = await compileSource(source, { targets: ["angular"], fileName: "Badge.ink.tsx" });
  expect(result.errors).toEqual([]);
  const files = result.filesFor("angular");
  const entry = files.find((f) => f.path === "Badge.component.ts");
  expect(
    entry,
    `expected Badge.component.ts among ${files.map((f) => f.path).join(", ")}`,
  ).toBeDefined();
  return { entry: entry!, supporting: files.filter((f) => f !== entry) };
}

describe("angular SSR mount", () => {
  it("renders a styled component with the recipe class merged onto the headless root", async () => {
    const { entry, supporting } = await compileAngular(STYLED_PAIR);
    const { html } = await mountForTarget(
      "angular",
      entry,
      { color: "primary", label: "Hi" },
      supporting,
    );

    // The recipe class (stubbed as base + modifier) lands on the headless ROOT <div>, merged with
    // its own static class — not stranded on the <ink-badge-base> host element. (Angular's classMap
    // dedupes the base class that appears in both the static class and the recipe output.)
    expect(html).toMatch(/<div[^>]*class="badge badge--color-primary"/);
    expect(html).toContain("Hi");
    // Components render inside their kebab-case ink-* host elements.
    expect(html).toContain("<ink-badge-base");
  });

  it("mounts an attribute-selector element-component on its native host (parsed tag[attr] selector)", async () => {
    // With a registry, a single static-element root compiles to a `button[inkBtn]` @Component (the
    // element IS the host). Mounted WITHOUT a host spec, mount.ts reflects that selector and parses
    // it into a real `<button inkBtn …>` — proving element-components are mountable standalone.
    const ELEMENT = `
import { defineComponent, Slot } from "@inkline/core";
export default defineComponent({ slots: { default: {} } }, (props: { label?: string }) => (
  <button class="btn"><Slot>{props.label}</Slot></button>
));
`;
    const analyzed = await analyzeOnly(
      { fileName: "Btn.ink.tsx", source: ELEMENT },
      { targets: ["angular"] },
    );
    const registry = buildAngularRegistry([analyzed.module]);
    const result = await compileSource(ELEMENT, {
      targets: ["angular"],
      fileName: "Btn.ink.tsx",
      config: { angularRegistry: registry },
    });
    expect(result.errors).toEqual([]);
    const [entry, ...supporting] = result.filesFor("angular");
    const { html } = await mountForTarget("angular", entry!, { label: "Hi" }, supporting);

    expect(html).toMatch(/<button[^>]*class="btn"[^>]*>Hi<\/button>/);
    expect(html).not.toContain("ink-btn");
  });

  it("renders without the recipe modifier when the styling prop is absent", async () => {
    const { entry, supporting } = await compileAngular(STYLED_PAIR);
    const { html } = await mountForTarget("angular", entry, { label: "Plain" }, supporting);

    expect(html).not.toContain("badge--color");
    expect(html).toContain("Plain");
  });

  it("projects default-slot content through the styled wrapper into the headless root", async () => {
    const { entry, supporting } = await compileAngular(STYLED_PAIR);
    const { html } = await mountForTarget(
      "angular",
      entry,
      { __slots: { default: "<strong>projected</strong>" } },
      supporting,
    );

    expect(html).toContain("<strong>projected</strong>");
  });

  it("renders named-slot fills projected via slot attributes", async () => {
    const NAMED_SLOTS = `
import { defineComponent, Slot } from "@inkline/core";
export default defineComponent({ slots: { default: {}, header: {} } }, () => {
  return (
    <section>
      <header>
        <Slot name="header" />
      </header>
      <main>
        <Slot />
      </main>
    </section>
  );
});
`;
    const result = await compileSource(NAMED_SLOTS, {
      targets: ["angular"],
      fileName: "Panel.ink.tsx",
    });
    expect(result.errors).toEqual([]);
    const [entry, ...supporting] = result.filesFor("angular");
    const { html } = await mountForTarget(
      "angular",
      entry!,
      { __slots: { header: "<em>Title</em>", default: "Body" } },
      supporting,
    );

    expect(html).toMatch(/<header>\s*<em>Title<\/em>/);
    expect(html).toMatch(/<main>\s*Body/);
  });

  it("renders a component using a model, an emitted event, and an element ref", async () => {
    // Exercises the JIT signal-metadata registration for model()/output()/viewChild() — the shapes
    // beyond plain input() — and confirms they SSR without breaking JIT compilation.
    const MODEL_REF = `
import { defineComponent, defineModel, defineEmits, createRef, onMount } from "@inkline/core";
export default defineComponent((props: { id?: string }) => {
  const [value, setValue] = defineModel<string>("value");
  const submit = defineEmits<{ submit: [] }>();
  const inputRef = createRef<HTMLInputElement>();
  onMount(() => { submit("submit"); });
  return (
    <input
      ref={inputRef}
      id={props.id}
      value={value()}
      onInput={(e: { currentTarget: HTMLInputElement }) => setValue(e.currentTarget.value)}
    />
  );
});
`;
    const result = await compileSource(MODEL_REF, {
      targets: ["angular"],
      fileName: "Field.ink.tsx",
    });
    // Two-way binding on Angular is supported (no error diagnostic); only the static Astro target
    // would flag it.
    expect(result.errors).toEqual([]);
    const [entry, ...supporting] = result.filesFor("angular");
    const { html } = await mountForTarget(
      "angular",
      entry!,
      { id: "field", value: "seed" },
      supporting,
    );

    expect(html).toMatch(/<input[^>]*id="field"/);
    expect(html).toMatch(/<input[^>]*value="seed"/);
  });
});
