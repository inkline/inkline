// R1 spike / regression guard for the Angular attribute-selector codegen (best-practice host
// elements). The whole directive-stacking design rests on one Ivy behaviour: when several
// directives/components sit on ONE element and each declares a `host: { '[class]': … }` binding,
// Ivy must UNION the class tokens (not last-wins). The existing SSR tests only exercise the
// `[klass]`-input forward, so they do NOT cover this — hence this dedicated proof.
//
// We can't mount an attribute-selector component directly (mount.ts's auto-host would emit an
// invalid `<button[inkBase]>` tag), so the entry is an ordinary element-selector wrapper whose
// template stacks the attribute selectors on a real `<button>` — exactly the shape codegen will
// emit at a `<IButton>` call site.

import { describe, it, expect } from "vitest";
import { mountForTarget } from "./mount.ts";
import type { GeneratedFile } from "@inkline/compiler";

function hostEntry(contents: string): GeneratedFile {
  return { path: "SpikeHost.component.ts", contents };
}

/** Pull the `class="…"` value off the first `<button …>` in the rendered HTML. */
function buttonClass(html: string): string {
  const m = html.match(/<button[^>]*\sclass="([^"]*)"/);
  return m ? m[1]! : "";
}

describe("angular host [class] merge (attribute-selector design gate)", () => {
  it("unions [class] host bindings from a component + N stacked directives on one element", async () => {
    // One @Component (button[inkBase]) + two @Directive ([inkStyled], [inkExtra]), each host-binding
    // a DISJOINT class token set, all on the same <button>. Union ⇒ every token present.
    const entry = hostEntry(`
import { Component, Directive } from "@angular/core";

@Component({ standalone: true, selector: "button[inkBase]", host: { "[class]": "'cmp-base'" }, template: "" })
class InkBaseComponent {}

@Directive({ standalone: true, selector: "[inkStyled]", host: { "[class]": "'dir-x dir-y'" } })
class InkStyledDirective {}

@Directive({ standalone: true, selector: "[inkExtra]", host: { "[class]": "'dir-z'" } })
class InkExtraDirective {}

@Component({
  standalone: true,
  selector: "spike-host",
  imports: [InkBaseComponent, InkStyledDirective, InkExtraDirective],
  template: \`<button inkBase inkStyled inkExtra></button>\`,
})
class SpikeHostComponent {}

export default SpikeHostComponent;
`);

    const { html } = await mountForTarget("angular", entry);
    const cls = buttonClass(html);

    // If Ivy did last-wins instead of union, one or more of these tokens would be missing — that
    // is the signal to switch to the fused-element fallback in the plan.
    expect(cls.split(/\s+/).filter(Boolean).sort()).toEqual(
      ["cmp-base", "dir-x", "dir-y", "dir-z"].sort(),
    );
  });

  it("routes a directive's property host binding ([disabled]) onto the shared element", async () => {
    const entry = hostEntry(`
import { Component, Directive } from "@angular/core";

@Component({ standalone: true, selector: "button[inkBase]", host: { "[class]": "'cmp-base'" }, template: "" })
class InkBaseComponent {}

@Directive({ standalone: true, selector: "[inkDisable]", host: { "[disabled]": "true" } })
class InkDisableDirective {}

@Component({
  standalone: true,
  selector: "spike-host",
  imports: [InkBaseComponent, InkDisableDirective],
  template: \`<button inkBase inkDisable></button>\`,
})
class SpikeHostComponent {}

export default SpikeHostComponent;
`);

    const { html } = await mountForTarget("angular", entry);
    expect(html).toMatch(/<button[^>]*\bdisabled\b/);
    expect(buttonClass(html)).toContain("cmp-base");
  });
});
