import { describe, it, expect } from "vitest";
import { createDiagnosticCollector } from "./collector.ts";
import type { Diagnostic } from "./codes.ts";

const loc = {
  file: "test.ink.tsx",
  line: 5,
  column: 12,
  offset: 100,
  length: 10,
} as const;

describe("DiagnosticCollector", () => {
  it("push() adds diagnostic without params", () => {
    const c = createDiagnosticCollector();
    c.push("INK0001", loc);
    const diags = c.freeze();

    expect(diags).toHaveLength(1);
    expect(diags[0]!.code).toBe("INK0001");
    expect(diags[0]!.severity).toBe("error");
    expect(diags[0]!.title).toBe("Namespace import of @inkline/core is not supported");
    expect(diags[0]!.loc).toBe(loc);
  });

  it("push() resolves placeholders", () => {
    const c = createDiagnosticCollector();
    c.push("INK0030", loc, { cycle: "a -> b -> a" });
    const diags = c.freeze();

    expect(diags[0]!.title).toBe("createMemo cycle detected: a -> b -> a");
  });

  it("push() resolves multiple placeholders", () => {
    const c = createDiagnosticCollector();
    c.push("INK0090", loc, { name: "my-plugin", message: "oops" });
    const diags = c.freeze();

    expect(diags[0]!.title).toBe("Plugin 'my-plugin' threw: oops");
  });

  it("push() preserves help text when present", () => {
    const c = createDiagnosticCollector();
    c.push("INK0001", loc);
    const diags = c.freeze();

    expect(diags[0]!.help).toBe("Use named imports: import { createSignal } from '@inkline/core'");
  });

  it("push() sets help to undefined when absent", () => {
    const c = createDiagnosticCollector();
    c.push("INK0060", loc);
    const diags = c.freeze();

    expect(diags[0]!.help).toBeUndefined();
  });

  it("push() includes url", () => {
    const c = createDiagnosticCollector();
    c.push("INK0050", loc);
    const diags = c.freeze();

    expect(diags[0]!.url).toBe("https://docs.inkline.dev/diagnostics/INK0050");
  });

  it("pushFrom() adds external diagnostics", () => {
    const c = createDiagnosticCollector();
    const external: Diagnostic = {
      code: "INK0010",
      severity: "warning",
      title: "Effect has no reactive dependencies; it runs once",
      url: "https://docs.inkline.dev/diagnostics/INK0010",
      loc,
    };
    c.pushFrom([external]);
    const diags = c.freeze();

    expect(diags).toHaveLength(1);
    expect(diags[0]).toBe(external);
  });

  it("freeze() returns a frozen array", () => {
    const c = createDiagnosticCollector();
    c.push("INK0001", loc);
    const diags = c.freeze();

    expect(Object.isFrozen(diags)).toBe(true);
  });

  it("push() after freeze throws", () => {
    const c = createDiagnosticCollector();
    c.freeze();

    expect(() => c.push("INK0001", loc)).toThrow("frozen");
  });

  it("pushFrom() after freeze throws", () => {
    const c = createDiagnosticCollector();
    c.freeze();

    expect(() => c.pushFrom([])).toThrow("frozen");
  });

  it("accumulates multiple diagnostics in order", () => {
    const c = createDiagnosticCollector();
    c.push("INK0001", loc);
    c.push("INK0050", loc);
    c.push("INK0010", loc);
    const diags = c.freeze();

    expect(diags).toHaveLength(3);
    expect(diags.map((d) => d.code)).toEqual(["INK0001", "INK0050", "INK0010"]);
  });
});
