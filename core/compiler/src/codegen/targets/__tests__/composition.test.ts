// Real-world codegen assertions for the "composition" feature area: components that instantiate
// other components (same-file children, multiple components per file, cross-file imports). These
// exercise the full pipeline (parse → lower → analyze → codegen) so they catch real bugs in how
// authored `.ink.tsx` composition becomes framework output.
//
// Focus areas:
//   - component instances resolve to real tags (NOT <unknown>)
//   - Angular standalone `imports: [...]` for child components used in the template
//   - attribute fallthrough (`{...__attrs}` / spread) onto the resolved instance
//
// To inspect a fixture's real output while writing assertions, compile it and log the contents:
//   const r = await compileFixture("ComponentRef"); console.log(r.files.angular![1].contents);

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

// Multi-component file: the last `export default` is one component; another component referenced in
// its template lives in the same module. Both must emit, and the instance must resolve to its tag.
async function allFiles(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files!.map((f) => f.contents).join("\n=====\n");
}

describe("ComponentRef: same-file child instance + forwarded ref", () => {
  it("React: <Child> resolves to a real tag (not <unknown>) with ref + fallthrough", async () => {
    const out = await allFiles("ComponentRef", "react");
    expect(out).toContain("<Child {...__attrs} className={props.className} ref={childRef} />");
    expect(out).not.toContain("<unknown");
  });

  it("Solid: child instance ref is wired via callback ref", async () => {
    const out = await allFiles("ComponentRef", "solid");
    expect(out).toContain("<Child {...__attrs} class={props.class} ref={(el) => childRef = el} />");
  });

  it("Svelte: child instance uses bind:this for the ref", async () => {
    const out = await allFiles("ComponentRef", "svelte");
    expect(out).toContain("<Child bind:this={childRef} {...__attrs} class={__attrs.class} />");
  });

  it("Vue: <Child> tag is emitted in the template", async () => {
    const out = await allFiles("ComponentRef", "vue");
    expect(out).toContain('<Child ref="childRef" />');
    // BUG: the second component's <script setup> never imports `Child`, so the template references
    // an undefined component at runtime. The same-file child emits as a separate file but is not
    // wired into the parent's module.
    expect(out).not.toContain("import Child");
  });

  it("Angular: child instance resolves to <Child /> but is NOT declared in imports", async () => {
    const out = await allFiles("ComponentRef", "angular");
    expect(out).toContain("template: `<Child />`");
    // BUG: the ComponentRef @Component has no `imports: [...]`, yet its template uses <Child />.
    // Angular standalone components must list child components in `imports` or the tag is unknown.
    expect(out).toContain("selector: 'ComponentRef', template: `<Child />`");
    expect(out).not.toContain("imports: [Child");
  });
});

describe("MultipleComponentsPerFile: Counter renders sibling <Label>", () => {
  it("React: <Label> resolves to a real tag with prop binding (not <unknown>)", async () => {
    const out = await allFiles("MultipleComponentsPerFile", "react");
    expect(out).toContain("<Label text={String(count)} />");
    expect(out).not.toContain("<unknown");
  });

  it("Solid: <Label> instance reads the signal via call form", async () => {
    const out = await allFiles("MultipleComponentsPerFile", "solid");
    expect(out).toContain("<Label text={String(count())} />");
  });

  it("Angular: Label instance is emitted but missing from imports[]", async () => {
    const out = await allFiles("MultipleComponentsPerFile", "angular");
    expect(out).toContain('<Label [text]="String(count())" />');
    // BUG: Counter's @Component omits `imports: [Label]` even though the template instantiates
    // <Label>. Standalone Angular requires the child in imports for the tag to render.
    expect(out).toContain("selector: 'Counter', template: `<div>");
    expect(out).not.toContain("imports: [Label");
  });

  it("Svelte/Vue/Astro/Angular: setter `setCount` is undefined in the click handler", async () => {
    // BUG: only the reader `count` is destructured/declared; `setCount` is never emitted in these
    // targets' scope, so the inline `() => setCount(count + 1)` handler throws ReferenceError.
    const svelte = await allFiles("MultipleComponentsPerFile", "svelte");
    expect(svelte).toContain("onclick={() => setCount(count + 1)}");
    expect(svelte).not.toContain("function setCount");
    expect(svelte).not.toContain("const setCount");
  });
});

describe("Composite: signal setters dropped from non-React event handlers", () => {
  it("React: setX/setY are real bindings from useState", async () => {
    const out = await code("Composite", "react");
    expect(out).toContain("const [x, setX] = useState(1)");
    expect(out).toContain("onClick={() => setX(x + 1)}");
  });

  it("Vue: handler references setX, but script only declares the reader ref (undefined setter)", async () => {
    const out = await code("Composite", "vue");
    expect(out).toContain("const x = ref(1)");
    // BUG: template emits `@click="() => setX(x + 1)"` but <script setup> never defines `setX`.
    expect(out).toContain('@click="() => setX(x + 1)"');
    expect(out).not.toContain("setX =");
    expect(out).not.toContain("function setX");
  });

  it("Qwik: click handler is double-wrapped, returning a function instead of calling setX", async () => {
    const out = await code("Composite", "qwik");
    // BUG: `$(() => () => setX(...))` — clicking returns the inner arrow rather than invoking it,
    // and `setX` is undefined in scope anyway.
    expect(out).toContain("onClick={$(() => () => setX(x.value + 1))}");
  });
});

describe("CrossFileBase / CrossFileStyled: cross-file component composition", () => {
  it("React: imported <CrossFileBase> resolves to a real tag with merged class + fallthrough", async () => {
    const out = await code("CrossFileStyled", "react");
    expect(out).toContain('import { CrossFileBase } from "./CrossFileBase";');
    expect(out).toContain(
      '<CrossFileBase {...__attrs} className={[props.size, props.className].filter(Boolean).join(" ")} label={props.label}>',
    );
    expect(out).not.toContain("<unknown");
  });

  it("Angular: cross-file child IS correctly declared in imports[] (alias form)", async () => {
    const out = await code("CrossFileStyled", "angular");
    expect(out).toContain(
      'import { CrossFileBaseComponent as CrossFileBase } from "./CrossFileBase.component";',
    );
    expect(out).toContain("imports: [CrossFileBase]");
    expect(out).toContain('<CrossFileBase [class]="size" [label]="label">');
  });

  it("Vue: cross-file import is rewritten to .vue and bound with :class / :label", async () => {
    const out = await code("CrossFileStyled", "vue");
    expect(out).toContain(
      'import CrossFileBase, { type CrossFileBaseProps } from "./CrossFileBase.vue";',
    );
    expect(out).toContain('<CrossFileBase :class="size" :label="label">');
  });

  it("Svelte: destructured props feed the cross-file instance (no bare `props`)", async () => {
    const out = await code("CrossFileStyled", "svelte");
    expect(out).toContain(
      'import CrossFileBase, { type CrossFileBaseProps } from "./CrossFileBase.svelte";',
    );
    expect(out).toContain(
      '<CrossFileBase {...__attrs} class={[size, __attrs.class].filter(Boolean).join(" ")} label={label}>',
    );
  });

  it("Base component default slot falls back to the label prop across targets", async () => {
    const react = await code("CrossFileBase", "react");
    expect(react).toContain("{props.children ?? props.label}");
    const vue = await code("CrossFileBase", "vue");
    expect(vue).toContain("<slot>");
    const angular = await code("CrossFileBase", "angular");
    expect(angular).toContain("<ng-content />");
  });
});
