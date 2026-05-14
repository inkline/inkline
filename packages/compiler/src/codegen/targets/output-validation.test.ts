import { describe, it, expect } from "vitest";
import { compileFixture, type CompiledFixture } from "../../testing/harness.ts";
import type { TargetName } from "../context.ts";

const cache = new Map<string, CompiledFixture>();

async function getCode(fixture: string, target: TargetName): Promise<string> {
  const key = `${fixture}:${[target]}`;
  if (!cache.has(key)) {
    cache.set(key, await compileFixture(fixture, [target]));
  }
  const result = cache.get(key)!;
  const files = result.files[target];
  expect(files, `${fixture} should produce files for ${target}`).toBeDefined();
  expect(files!.length).toBeGreaterThan(0);
  return files![0]!.contents;
}

// ──────────────────────────────────────────────────────────────────
// Counter: createSignal + createMemo + createEffect + JSX
// ──────────────────────────────────────────────────────────────────

describe("Counter output", () => {
  it("React: uses useState, useMemo, useEffect with stripped calls", async () => {
    const code = await getCode("Counter", "react");
    expect(code).toContain("useState");
    expect(code).toContain("useMemo");
    expect(code).toContain("useEffect");
    expect(code).toContain('from "react"');
    expect(code).not.toContain("createSignal");
    expect(code).not.toContain("createMemo");
  });

  it("Solid: uses createSignal, createMemo, createEffect with preserved calls", async () => {
    const code = await getCode("Counter", "solid");
    expect(code).toContain("createSignal");
    expect(code).toContain("createMemo");
    expect(code).toContain("createEffect");
    expect(code).toContain('from "solid-js"');
    expect(code).not.toContain("useState");
  });

  it("Vue: uses ref, computed, watchEffect in SFC", async () => {
    const code = await getCode("Counter", "vue");
    expect(code).toContain("ref(");
    expect(code).toContain("computed(");
    expect(code).toContain("watchEffect(");
    expect(code).toContain('from "vue"');
    expect(code).toContain("<script setup");
    expect(code).toContain("<template>");
    expect(code).not.toContain("useState");
    expect(code).not.toContain("createSignal");
  });

  it("Svelte: uses $state, $derived, $effect runes", async () => {
    const code = await getCode("Counter", "svelte");
    expect(code).toContain("$state(");
    expect(code).toContain("$derived(");
    expect(code).toContain("$effect(");
    expect(code).toContain("<script");
    expect(code).not.toContain("useState");
    expect(code).not.toContain("createSignal");
    expect(code).not.toContain('from "vue"');
  });
});

// ──────────────────────────────────────────────────────────────────
// Button: props from parameter type
// ──────────────────────────────────────────────────────────────────

describe("Button output (props)", () => {
  it("React: typed props in function signature", async () => {
    const code = await getCode("Button", "react");
    expect(code).toContain("label");
    expect(code).toContain("disabled");
    expect(code).not.toContain("Record<string, never>");
  });

  it("Solid: typed props, not `any`", async () => {
    const code = await getCode("Button", "solid");
    expect(code).toContain("label");
    expect(code).toContain("disabled");
    expect(code).not.toContain("props: any");
  });

  it("Vue: uses defineProps with typed fields", async () => {
    const code = await getCode("Button", "vue");
    expect(code).toContain("defineProps");
    expect(code).toContain("label");
    expect(code).toContain("disabled");
  });

  it("Svelte: uses $props() with typed destructuring", async () => {
    const code = await getCode("Button", "svelte");
    expect(code).toContain("$props()");
    expect(code).toContain("label");
    expect(code).toContain("disabled");
  });
});

// ──────────────────────────────────────────────────────────────────
// Conditional: <Show> → IRIf lowering
// ──────────────────────────────────────────────────────────────────

describe("Conditional output (if/show)", () => {
  it("React: uses ternary in JSX expression", async () => {
    const code = await getCode("Conditional", "react");
    expect(code).toContain("?");
    expect(code).toContain(":");
  });

  it("Solid: uses <Show when={...}>", async () => {
    const code = await getCode("Conditional", "solid");
    expect(code).toContain("<Show");
    expect(code).toContain("when={");
  });

  it("Vue: uses v-if directive", async () => {
    const code = await getCode("Conditional", "vue");
    expect(code).toContain("v-if");
  });

  it("Svelte: uses {#if} block", async () => {
    const code = await getCode("Conditional", "svelte");
    expect(code).toContain("{#if");
    expect(code).toContain("{/if}");
  });
});

// ──────────────────────────────────────────────────────────────────
// ForLoop: <For> → IRFor lowering
// ──────────────────────────────────────────────────────────────────

describe("ForLoop output (for/each)", () => {
  it("React: uses .map() with React.Fragment key", async () => {
    const code = await getCode("ForLoop", "react");
    expect(code).toContain(".map(");
  });

  it("Solid: uses <For each={...}>", async () => {
    const code = await getCode("ForLoop", "solid");
    expect(code).toContain("<For");
    expect(code).toContain("each={");
  });

  it("Vue: uses v-for directive", async () => {
    const code = await getCode("ForLoop", "vue");
    expect(code).toContain("v-for");
  });

  it("Svelte: uses {#each} block", async () => {
    const code = await getCode("ForLoop", "svelte");
    expect(code).toContain("{#each");
    expect(code).toContain("{/each}");
  });
});

// ──────────────────────────────────────────────────────────────────
// Lifecycle: onMount + onCleanup
// ──────────────────────────────────────────────────────────────────

describe("Lifecycle output", () => {
  it("React: uses useEffect with empty deps for onMount", async () => {
    const code = await getCode("Lifecycle", "react");
    expect(code).toContain("useEffect(");
    expect(code).toContain("[]");
  });

  it("Solid: uses onMount and onCleanup", async () => {
    const code = await getCode("Lifecycle", "solid");
    expect(code).toContain("onMount(");
    expect(code).toContain("onCleanup(");
  });

  it("Vue: uses onMounted and onUnmounted", async () => {
    const code = await getCode("Lifecycle", "vue");
    expect(code).toContain("onMounted(");
    expect(code).toContain("onUnmounted(");
  });

  it("Svelte: uses $effect for lifecycle", async () => {
    const code = await getCode("Lifecycle", "svelte");
    expect(code).toContain("$effect(");
  });
});

// ──────────────────────────────────────────────────────────────────
// ElementRef: createRef + ref attribute
// ──────────────────────────────────────────────────────────────────

describe("ElementRef output", () => {
  it("React: uses useRef with HTMLInputElement type", async () => {
    const code = await getCode("ElementRef", "react");
    expect(code).toContain("useRef");
  });

  it("Solid: uses let declaration for ref", async () => {
    const code = await getCode("ElementRef", "solid");
    expect(code).toContain("let inputRef");
  });

  it("Vue: uses ref() for element ref", async () => {
    const code = await getCode("ElementRef", "vue");
    expect(code).toContain("ref(");
  });

  it("Svelte: uses $state for ref", async () => {
    const code = await getCode("ElementRef", "svelte");
    expect(code).toContain("$state");
  });
});

// ──────────────────────────────────────────────────────────────────
// FormField: two-way binding (value + onInput)
// ──────────────────────────────────────────────────────────────────

describe("FormField output (two-way binding)", () => {
  it("React: has value and onChange/onInput binding", async () => {
    const code = await getCode("FormField", "react");
    expect(code).toContain("value={");
  });

  it("Solid: has value and oninput binding", async () => {
    const code = await getCode("FormField", "solid");
    expect(code).toContain("value={");
  });

  it("Vue: has value binding in template", async () => {
    const code = await getCode("FormField", "vue");
    expect(code).toContain("<template>");
  });

  it("Svelte: has input element", async () => {
    const code = await getCode("FormField", "svelte");
    expect(code).toContain("<input");
    expect(code).toContain("$state(");
  });
});

// ──────────────────────────────────────────────────────────────────
// SwitchTabs: <Switch>/<Match> → IRSwitch
// ──────────────────────────────────────────────────────────────────

describe("SwitchTabs output", () => {
  it("React: uses ternary chain", async () => {
    const code = await getCode("SwitchTabs", "react");
    expect(code).toContain("?");
  });

  it("Solid: uses <Switch> and <Match>", async () => {
    const code = await getCode("SwitchTabs", "solid");
    expect(code).toContain("<Switch");
    expect(code).toContain("<Match");
  });
});

// ──────────────────────────────────────────────────────────────────
// Composite: all primitives together
// ──────────────────────────────────────────────────────────────────

describe("Composite output (all primitives)", () => {
  it("React: has all hooks", async () => {
    const code = await getCode("Composite", "react");
    expect(code).toContain("useState");
    expect(code).toContain("useMemo");
    expect(code).toContain("useEffect");
    expect(code).toContain("onClick");
  });

  it("Solid: has all primitives", async () => {
    const code = await getCode("Composite", "solid");
    expect(code).toContain("createSignal");
    expect(code).toContain("createMemo");
    expect(code).toContain("createEffect");
    expect(code).toContain("onclick");
  });

  it("Vue: has all composition API calls", async () => {
    const code = await getCode("Composite", "vue");
    expect(code).toContain("ref(");
    expect(code).toContain("computed(");
    expect(code).toContain("watchEffect(");
  });

  it("Svelte: has all runes", async () => {
    const code = await getCode("Composite", "svelte");
    expect(code).toContain("$state(");
    expect(code).toContain("$derived(");
    expect(code).toContain("$effect(");
  });
});

// ──────────────────────────────────────────────────────────────────
// PropDefaults: options-object props
// ──────────────────────────────────────────────────────────────────

describe("PropDefaults output", () => {
  it("React: has prop names in signature", async () => {
    const code = await getCode("PropDefaults", "react");
    expect(code).toContain("color");
    expect(code).toContain("size");
  });

  it("Vue: uses defineProps", async () => {
    const code = await getCode("PropDefaults", "vue");
    expect(code).toContain("defineProps");
  });

  it("Svelte: uses $props()", async () => {
    const code = await getCode("PropDefaults", "svelte");
    expect(code).toContain("$props()");
  });
});

// ──────────────────────────────────────────────────────────────────
// ComponentRef: ref to child component
// ──────────────────────────────────────────────────────────────────

describe("ComponentRef output", () => {
  it("React: multi-component file produces valid components", async () => {
    const result = await compileFixture("ComponentRef", ["react"]);
    const allCode = result.files.react!.map((f) => f.contents).join("\n");
    expect(allCode).toContain("useRef");
    expect(allCode).toContain("function Child");
  });

  it("Solid: multi-component file produces valid components", async () => {
    const result = await compileFixture("ComponentRef", ["solid"]);
    const allCode = result.files.solid!.map((f) => f.contents).join("\n");
    expect(allCode).toContain("let childRef");
    expect(allCode).toContain("function Child");
  });
});

// ──────────────────────────────────────────────────────────────────
// New fixtures: ControlledSelect
// ──────────────────────────────────────────────────────────────────

describe("ControlledSelect output", () => {
  it("React: renders select with value and onChange", async () => {
    const code = await getCode("ControlledSelect", "react");
    expect(code).toContain("<select");
    expect(code).toContain("<option");
    expect(code).toContain("value={");
    expect(code).toContain("useState");
  });

  it("Solid: renders select preserving reactive calls", async () => {
    const code = await getCode("ControlledSelect", "solid");
    expect(code).toContain("<select");
    expect(code).toContain("<option");
    expect(code).toContain("createSignal");
  });

  it("Vue: renders select in template", async () => {
    const code = await getCode("ControlledSelect", "vue");
    expect(code).toContain("<select");
    expect(code).toContain("<option");
    expect(code).toContain("<template>");
  });

  it("Svelte: renders select with $state", async () => {
    const code = await getCode("ControlledSelect", "svelte");
    expect(code).toContain("<select");
    expect(code).toContain("<option");
    expect(code).toContain("$state(");
  });
});

// ──────────────────────────────────────────────────────────────────
// ConditionalClass: dynamic class binding
// ──────────────────────────────────────────────────────────────────

describe("ConditionalClass output", () => {
  it("React: uses className with ternary", async () => {
    const code = await getCode("ConditionalClass", "react");
    expect(code).toContain("className={");
    expect(code).toContain("active");
    expect(code).toContain("inactive");
  });

  it("Solid: uses class with ternary", async () => {
    const code = await getCode("ConditionalClass", "solid");
    expect(code).toContain("class={");
    expect(code).toContain("active");
  });

  it("Vue: uses :class binding in template", async () => {
    const code = await getCode("ConditionalClass", "vue");
    expect(code).toContain("active");
    expect(code).toContain("inactive");
  });

  it("Svelte: uses class attribute", async () => {
    const code = await getCode("ConditionalClass", "svelte");
    expect(code).toContain("active");
    expect(code).toContain("inactive");
  });
});

// ──────────────────────────────────────────────────────────────────
// MemoChain: 4-level linear memo dependency chain
// ──────────────────────────────────────────────────────────────────

describe("MemoChain output", () => {
  it("React: has 3 useMemo calls chained", async () => {
    const code = await getCode("MemoChain", "react");
    const memoCount = (code.match(/useMemo/g) ?? []).length;
    expect(memoCount).toBeGreaterThanOrEqual(3);
  });

  it("Solid: has 3 createMemo calls chained", async () => {
    const code = await getCode("MemoChain", "solid");
    const memoCount = (code.match(/createMemo/g) ?? []).length;
    expect(memoCount).toBeGreaterThanOrEqual(3);
  });

  it("Vue: has 3 computed() calls chained", async () => {
    const code = await getCode("MemoChain", "vue");
    const computedCount = (code.match(/computed\(/g) ?? []).length;
    expect(computedCount).toBeGreaterThanOrEqual(3);
  });

  it("Svelte: has 3 $derived() calls", async () => {
    const code = await getCode("MemoChain", "svelte");
    const derivedCount = (code.match(/\$derived\(/g) ?? []).length;
    expect(derivedCount).toBeGreaterThanOrEqual(3);
  });
});

// ──────────────────────────────────────────────────────────────────
// MixedControlFlow: <For> with <Show> inside
// ──────────────────────────────────────────────────────────────────

describe("MixedControlFlow output", () => {
  it("React: has .map for list rendering", async () => {
    const code = await getCode("MixedControlFlow", "react");
    expect(code).toContain(".map(");
    expect(code).toContain("useState");
  });

  it("Solid: has <For> for list rendering", async () => {
    const code = await getCode("MixedControlFlow", "solid");
    expect(code).toContain("<For");
    expect(code).toContain("createSignal");
  });

  it("Vue: has v-for for list rendering", async () => {
    const code = await getCode("MixedControlFlow", "vue");
    expect(code).toContain("v-for");
    expect(code).toContain("<template>");
  });

  it("Svelte: has {#each} for list rendering", async () => {
    const code = await getCode("MixedControlFlow", "svelte");
    expect(code).toContain("{#each");
    expect(code).toContain("$state(");
  });
});

// ──────────────────────────────────────────────────────────────────
// BatchUpdates: batch() primitive
// ──────────────────────────────────────────────────────────────────

describe("BatchUpdates output", () => {
  it("React: has onClick handler with multiple setState calls", async () => {
    const code = await getCode("BatchUpdates", "react");
    expect(code).toContain("useState");
    expect(code).toContain("useMemo");
    expect(code).toContain("onClick");
  });

  it("Solid: preserves batch() call", async () => {
    const code = await getCode("BatchUpdates", "solid");
    expect(code).toContain("createSignal");
    expect(code).toContain("createMemo");
  });
});

// ──────────────────────────────────────────────────────────────────
// MultiRefs: multiple element refs
// ──────────────────────────────────────────────────────────────────

describe("MultiRefs output", () => {
  it("React: has two useRef calls", async () => {
    const code = await getCode("MultiRefs", "react");
    const refCount = (code.match(/useRef/g) ?? []).length;
    expect(refCount).toBeGreaterThanOrEqual(2);
  });

  it("Solid: has two let ref declarations", async () => {
    const code = await getCode("MultiRefs", "solid");
    expect(code).toContain("let inputRef");
    expect(code).toContain("let buttonRef");
  });

  it("Vue: has two ref() calls", async () => {
    const code = await getCode("MultiRefs", "vue");
    const refCount = (code.match(/\bref[<(]/g) ?? []).length;
    expect(refCount).toBeGreaterThanOrEqual(2);
  });

  it("Svelte: has two $state ref declarations", async () => {
    const code = await getCode("MultiRefs", "svelte");
    expect(code).toContain("inputRef");
    expect(code).toContain("buttonRef");
  });
});

// ──────────────────────────────────────────────────────────────────
// ControlledTextarea: textarea element
// ──────────────────────────────────────────────────────────────────

describe("ControlledTextarea output", () => {
  it("React: renders textarea with value binding", async () => {
    const code = await getCode("ControlledTextarea", "react");
    expect(code).toContain("<textarea");
    expect(code).toContain("value={");
    expect(code).toContain("useState");
  });

  it("Solid: renders textarea with reactive binding", async () => {
    const code = await getCode("ControlledTextarea", "solid");
    expect(code).toContain("<textarea");
    expect(code).toContain("createSignal");
  });

  it("Vue: renders textarea in template", async () => {
    const code = await getCode("ControlledTextarea", "vue");
    expect(code).toContain("<textarea");
    expect(code).toContain("<template>");
  });

  it("Svelte: renders textarea with $state", async () => {
    const code = await getCode("ControlledTextarea", "svelte");
    expect(code).toContain("<textarea");
    expect(code).toContain("$state(");
  });
});

// ──────────────────────────────────────────────────────────────────
// DynamicList: list with add pattern
// ──────────────────────────────────────────────────────────────────

describe("DynamicList output", () => {
  it("React: has .map() for list rendering", async () => {
    const code = await getCode("DynamicList", "react");
    expect(code).toContain(".map(");
    expect(code).toContain("useState");
  });

  it("Solid: has <For> for list rendering", async () => {
    const code = await getCode("DynamicList", "solid");
    expect(code).toContain("<For");
    expect(code).toContain("createSignal");
  });

  it("Vue: has v-for in template", async () => {
    const code = await getCode("DynamicList", "vue");
    expect(code).toContain("v-for");
    expect(code).toContain("<template>");
  });

  it("Svelte: has {#each} block", async () => {
    const code = await getCode("DynamicList", "svelte");
    expect(code).toContain("{#each");
    expect(code).toContain("$state(");
  });
});

// ──────────────────────────────────────────────────────────────────
// Cross-target structural invariants
// ──────────────────────────────────────────────────────────────────

describe("structural invariants", () => {
  it("React output never imports from vue, solid-js, or svelte", async () => {
    for (const fixture of ["Counter", "Button", "Composite", "ForLoop"]) {
      const code = await getCode(fixture, "react");
      expect(code).not.toContain('from "vue"');
      expect(code).not.toContain('from "solid-js"');
      expect(code).not.toContain("$state");
      expect(code).not.toContain("$derived");
    }
  });

  it("Solid output never imports from react or vue", async () => {
    for (const fixture of ["Counter", "Button", "Composite", "ForLoop"]) {
      const code = await getCode(fixture, "solid");
      expect(code).not.toContain('from "react"');
      expect(code).not.toContain('from "vue"');
      expect(code).not.toContain("useState");
      expect(code).not.toContain("$state");
    }
  });

  it("Vue output is a valid SFC structure", async () => {
    for (const fixture of ["Counter", "Button", "Composite", "Lifecycle"]) {
      const code = await getCode(fixture, "vue");
      expect(code).toContain("<script setup");
      expect(code).toContain("</script>");
      expect(code).toContain("<template>");
      expect(code).toContain("</template>");
    }
  });

  it("Svelte output has <script> tag", async () => {
    for (const fixture of ["Counter", "Button", "Composite", "Lifecycle"]) {
      const code = await getCode(fixture, "svelte");
      expect(code).toContain("<script");
      expect(code).toContain("</script>");
    }
  });

  it("React uses className for class attribute", async () => {
    const code = await getCode("ConditionalClass", "react");
    expect(code).toContain("className");
    expect(code).not.toMatch(/\bclass=/);
  });

  it("Solid/Vue/Svelte use class for class attribute", async () => {
    for (const target of ["solid", "vue", "svelte"] as const) {
      const code = await getCode("ConditionalClass", target);
      expect(code).not.toContain("className");
    }
  });

  it("React uses camelCase events (onClick)", async () => {
    const code = await getCode("Counter", "react");
    expect(code).toContain("onClick");
  });

  it("Solid uses lowercase events (onclick)", async () => {
    const code = await getCode("Counter", "solid");
    expect(code).toContain("onclick");
  });

  it("Vue uses kebab events (@click)", async () => {
    const code = await getCode("Composite", "vue");
    expect(code).toContain("@click");
  });

  it("Svelte uses lowercase events (onclick)", async () => {
    const code = await getCode("Counter", "svelte");
    expect(code).toContain("onclick");
  });
});
