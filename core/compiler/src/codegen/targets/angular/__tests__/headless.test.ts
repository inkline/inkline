// Angular: headless components (`defineComponent({ meta: { headless: true } }, …)`) emit a second,
// attribute-selector @Component whose single static-element root IS the Angular host — so the native
// element carries the behavior with zero wrapper (`<button ink-headless-button>`). The original
// element-selector wrapper is still emitted unchanged (dual selector). A non-element root can't be
// host-extracted: the target warns (INK0111) and emits only the wrapper.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";
import { compileFixture } from "../../../../testing/harness.ts";
import { angularAttrSelector } from "../selector.ts";

describe("angularAttrSelector", () => {
  it("binds the ink-* token to the root element tag", () => {
    expect(angularAttrSelector("IButtonBase", "button")).toBe("button[ink-button-base]");
    expect(angularAttrSelector("HeadlessBox", "div")).toBe("div[ink-headless-box]");
  });
});

describe("headless host-extraction (HeadlessButton)", () => {
  it("keeps the element-selector wrapper variant unchanged (display: contents)", async () => {
    const out = await compileTo("HeadlessButton", "angular");
    expect(out).toContain("selector: 'ink-headless-button', host: { style: 'display: contents' }");
    expect(out).toContain("export class HeadlessButtonComponent");
  });

  it("emits an attribute-selector host variant binding to the native <button>", async () => {
    const out = await compileTo("HeadlessButton", "angular");
    expect(out).toContain("selector: 'button[ink-headless-button]'");
    expect(out).toContain("export class HeadlessButtonHostComponent");
  });

  it("extracts the root element's attrs/events as host bindings", async () => {
    const out = await compileTo("HeadlessButton", "angular");
    // class merges the forwarded klass; static attr stays literal; KEEP_PROPERTY stays a property
    // binding; every other dynamic attr is an [attr.*] binding omitted when nullish; the root event
    // becomes a host event binding with the param mapped to $event.
    expect(out).toContain(
      `host: { '[class]': "'hb' + (klass() ? ' ' + klass() : '')", 'type': 'button', '[disabled]': "disabled()", '[attr.aria-label]': "(label()) ?? null", '(click)': "$event.preventDefault()" }`,
    );
  });

  it("emits a children-only template (the <button> wrapper is gone — it became the host)", async () => {
    const out = await compileTo("HeadlessButton", "angular");
    // The host variant's template is exactly the root's children: the @if spinner + projected slot,
    // with no surrounding <button> tag.
    expect(out).toContain(
      'template: `@if (loading()) {\n<span class="hb-spinner" aria-hidden="true"></span>\n}\n<ng-content>{{ label() }}</ng-content>`',
    );
  });

  it("shares the signal-input class body (klass + props) across both variants", async () => {
    const out = await compileTo("HeadlessButton", "angular");
    expect(out).toContain("klass = input<string>()");
    expect(out).toContain("disabled = input<boolean>()");
    // Two @Component blocks, two class declarations, one shared body shape.
    expect(out.match(/@Component\(\{/g)).toHaveLength(2);
    expect(out.match(/export class HeadlessButton\w*Component/g)).toHaveLength(2);
  });
});

describe("headless host-extraction (HeadlessBox: no class, inline child)", () => {
  it("falls back to `[class]: klass()` when the root has no class attribute", async () => {
    const out = await compileTo("HeadlessBox", "angular");
    expect(out).toContain("selector: 'div[ink-headless-box]', host: { '[class]': \"klass()\" }");
  });

  it("emits an inline children-only template", async () => {
    const out = await compileTo("HeadlessBox", "angular");
    expect(out).toContain("export class HeadlessBoxHostComponent");
    expect(out).toContain(
      "selector: 'div[ink-headless-box]', host: { '[class]': \"klass()\" }, template: `{{ label() }}`",
    );
  });
});

describe("headless host-extraction guard (HeadlessFragmentRoot)", () => {
  it("warns (INK0111) and emits only the element-selector wrapper for a non-element root", async () => {
    const result = await compileFixture("HeadlessFragmentRoot", ["angular"]);
    expect(result.diagnostics.some((d) => d.code === "INK0111")).toBe(true);

    const out = result.files.angular![0]!.contents;
    expect(out).toContain("export class HeadlessFragmentRootComponent");
    expect(out).not.toContain("HostComponent");
    expect(out).not.toContain("[ink-headless-fragment-root]");
  });
});
