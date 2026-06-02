// Real-world codegen assertions: author `.ink.tsx` → compile → assert the ACTUAL generated
// framework code. Unlike hand-built IR tests, these exercise the full pipeline (parse → lower →
// analyze → codegen), so they catch real bugs in how authored components become framework output.
//
// To inspect a fixture's real output while writing assertions, compile it and log the contents:
//   const r = await compileFixture("StyledRecipe"); console.log(r.files.svelte![0].contents);

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../testing/harness.ts";
import type { TargetName } from "../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
  return files![0]!.contents;
}

// A styled component: a module-level recipe computed in a memo from a subset of props, bound on
// the root, with a default slot that falls back to a prop. This is the pattern that exposed the
// React dependency-array, Solid slot, Svelte/Angular whole-prop, and object-literal-rewrite bugs.
describe("StyledRecipe: recipe memo from props + default slot", () => {
  it("React: granular deduped useMemo deps; default slot → children", async () => {
    const out = await code("StyledRecipe", "react");
    expect(out).toContain(
      "const className = useMemo(() => badge({ color: props.color, size: props.size }), [props.color, props.size])",
    );
    expect(out).toContain("{props.children ?? props.label}");
  });

  it("Vue: computed from props; native slot with fallback", async () => {
    const out = await code("StyledRecipe", "vue");
    expect(out).toContain(
      "const className = computed(() => badge({ color: props.color, size: props.size }))",
    );
    expect(out).toContain("<slot>");
  });

  it("Solid: createMemo; default slot via children; children kept out of fallthrough", async () => {
    const out = await code("StyledRecipe", "solid");
    expect(out).toContain(
      "const className = createMemo(() => badge({ color: props.color, size: props.size }))",
    );
    expect(out).toContain('splitProps(props, ["children", "label", "color", "size"])');
    expect(out).toContain("{props.children ?? props.label}");
  });

  it("Svelte: $derived over destructured props (no bare `props`); slot fallback", async () => {
    const out = await code("StyledRecipe", "svelte");
    expect(out).toContain("let className = $derived(badge({ color: color, size: size }))");
    expect(out).not.toMatch(/badge\(\{[^}]*props\./); // recipe args must not reference bare `props`
    expect(out).toContain("<slot>");
  });

  it("Angular: class-body computed uses this.x; styling props are @Input; bound via [class]", async () => {
    const out = await code("StyledRecipe", "angular");
    expect(out).toContain(
      "className = computed(() => badge({ color: this.color, size: this.size }))",
    );
    expect(out).toContain("@Input() color");
    expect(out).toContain("@Input() size");
    expect(out).toContain('[class]="className()"');
    expect(out).not.toContain("badge({ color: props.color"); // never bare props in class body
  });

  it("Qwik: useComputed$; read via .value", async () => {
    const out = await code("StyledRecipe", "qwik");
    expect(out).toContain(
      "const className = useComputed$(() => badge({ color: props.color, size: props.size }))",
    );
    expect(out).toContain("className.value");
  });

  it("Astro: recipe computed once as a const in frontmatter (over destructured props)", async () => {
    const out = await code("StyledRecipe", "astro");
    expect(out).toContain("const className = badge({ color: color, size: size })");
    expect(out).toContain("<slot />");
  });

  it("every target enumerates the styling props from the inline interface", async () => {
    for (const target of ["react", "vue", "solid", "svelte", "angular", "qwik", "astro"] as const) {
      const out = await code("StyledRecipe", target);
      expect(out, `${target} should know the color prop`).toMatch(/color/);
      expect(out, `${target} should know the size prop`).toMatch(/size/);
    }
  });
});
