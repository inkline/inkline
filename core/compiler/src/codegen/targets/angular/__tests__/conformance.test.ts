// The Angular conformance invariant that guards against a standalone template instantiating an
// `ink-*` child that isn't declared in `imports: [...]` (which Angular would silently render as an
// unknown element). Real fixtures always declare correctly, so these hand-built files exercise the
// detection + the no-template early-out directly.

import { describe, it, expect } from "vitest";
import { angularConformance } from "../conformance.ts";
import { runConformanceInvariants } from "../../../../testing/conformance.ts";
import type { GeneratedFile } from "../../../context.ts";

const file = (contents: string): GeneratedFile => ({ path: "X.component.ts", contents });

describe("angular conformance: template children declared", () => {
  it("passes when every ink-* tag has a matching declared import", () => {
    const out = file(
      `@Component({ standalone: true, selector: 'ink-page', imports: [Card], template: \`<ink-card></ink-card>\` })`,
    );
    expect(runConformanceInvariants(angularConformance.invariants, out)).toEqual([]);
  });

  it("flags an ink-* tag that is not declared in imports", () => {
    const out = file(
      `@Component({ standalone: true, selector: 'ink-page', imports: [], template: \`<ink-card></ink-card>\` })`,
    );
    const diags = runConformanceInvariants(angularConformance.invariants, out);
    expect(diags).toHaveLength(1);
    expect(diags[0]!.title).toContain("<ink-card>");
  });

  it("ignores a component with no template (e.g. a context module)", () => {
    const out = file(`export const FormContext = { key: new InjectionToken("FormContext") };`);
    expect(runConformanceInvariants(angularConformance.invariants, out)).toEqual([]);
  });

  it("does not flag the component's own selector tag", () => {
    // The host selector (`ink-page`) appears in the @Component metadata, never as a child tag in
    // its own template, so a self-reference is never a missing import.
    const out = file(
      `@Component({ standalone: true, selector: 'ink-page', template: \`<div></div>\` })`,
    );
    expect(runConformanceInvariants(angularConformance.invariants, out)).toEqual([]);
  });
});
