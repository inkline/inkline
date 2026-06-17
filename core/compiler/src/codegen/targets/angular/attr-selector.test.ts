// Phase 1 attribute-selector codegen: with a seeded Angular registry, a headless leaf emits as a
// native host element (`div[inkBadgeBase]`), a pure-forwarding styled component as a styling
// directive (`[inkBadge]`), and a consumer stacks them on the native element
// (`<div inkBadgeBase inkBadge>`). Without a registry every component stays an `ink-*` wrapper
// (covered by the existing snapshot/SSR suites), so this suite always compiles WITH a registry.

import { describe, it, expect } from "vitest";
import { analyzeOnly, buildAngularRegistry, compile } from "../../../pipeline/compile.ts";

const SOURCE = `
import { defineComponent, Slot, createMemo } from "@inkline/core";

const IBadgeBase = defineComponent({ slots: { default: {} } }, (props: { label?: string }) => (
  <div class="badge"><Slot>{props.label}</Slot></div>
));

const IBadge = defineComponent({ slots: { default: {} } }, (props: { label?: string; color?: string }) => {
  const className = createMemo(() => "badge--" + (props.color ?? "default"));
  return (
    <IBadgeBase class={className()}>
      <Slot>{props.label}</Slot>
    </IBadgeBase>
  );
});

const App = defineComponent(() => (
  <section><IBadge color="primary">Hi</IBadge></section>
));

export { IBadgeBase, IBadge, App };
`;

async function compileWithRegistry() {
  const input = { fileName: "Badge.ink.tsx", source: SOURCE };
  const analyzed = await analyzeOnly(input, { targets: ["angular"] });
  const registry = buildAngularRegistry([analyzed.module]);
  const result = await compile(input, { targets: ["angular"], angularRegistry: registry });
  const files = result.files.angular ?? [];
  const errors = result.diagnostics.filter((d) => d.severity === "error");
  const byName = (name: string) => files.find((f) => f.path === name)?.contents ?? "";
  return { errors, byName };
}

describe("angular attribute-selector codegen (Phase 1)", () => {
  it("emits a headless leaf as a native element-component host (no display:contents)", async () => {
    const { byName, errors } = await compileWithRegistry();
    const base = byName("IBadgeBase.component.ts");

    expect(errors).toEqual([]);
    expect(base).toContain("selector: 'div[inkBadgeBase]'");
    expect(base).toContain(`host: { '[class]': "'badge'" }`);
    expect(base).not.toContain("display: contents");
    expect(base).not.toContain("klass = input"); // element host needs no klass input
    // template is the ROOT's children only — the projected slot, not a wrapping <div>.
    expect(base).toContain("<ng-content>");
    expect(base).not.toMatch(/template: `<div/);
  });

  it("emits a pure-forwarding styled component as a styling directive that re-exports its base", async () => {
    const { byName } = await compileWithRegistry();
    const styled = byName("IBadge.component.ts");

    expect(styled).toContain("@Directive({ standalone: true, selector: '[inkBadge]'");
    expect(styled).toContain(`host: { '[class]': "(className())" }`);
    expect(styled).toContain("import { Directive");
    // A directive has no template/imports; it re-exports its base so consumers can declare the chain.
    expect(styled).not.toContain("template:");
    expect(styled).toContain(`export { IBadgeBaseComponent } from "./IBadgeBase.component"`);
    expect(styled).not.toContain("display: contents");
  });

  it("stacks the chain on the native host element at a consumer call site, importing every link", async () => {
    const { byName } = await compileWithRegistry();
    const app = byName("App.component.ts");

    // The consumer renders the whole chain on one <div>; the recipe class on IBadge becomes a
    // direct [class] (Ivy unions it with the host bindings), not a [klass] input forward.
    expect(app).toContain("<div inkBadgeBase inkBadge");
    expect(app).not.toContain("<ink-badge");
    expect(app).toContain("Hi");
    // Both links are imported (the base from the styled component's module, via its re-export).
    expect(app).toMatch(/imports: \[[^\]]*\bIBadge\b[^\]]*\bIBadgeBase\b/);
    expect(app).toContain(`import { IBadgeComponent as IBadge } from "./IBadge.component"`);
    expect(app).toContain(`import { IBadgeBaseComponent as IBadgeBase } from "./IBadge.component"`);
  });
});
