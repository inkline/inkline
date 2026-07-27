import { describe, it, expect } from "vitest";
import { resolveOptions } from "./options.ts";
import { InklineConfigError } from "./diagnostics/error.ts";
import type { Diagnostic } from "./diagnostics/codes.ts";
import { createRegistry } from "../codegen/registry.ts";
import { react as reactTarget } from "../codegen/targets/react/index.ts";

/** Run `fn`, assert it failed with a config error, and hand back the diagnostic it carries. */
function configErrorFrom(fn: () => unknown): Diagnostic {
  try {
    fn();
  } catch (err) {
    expect(err).toBeInstanceOf(InklineConfigError);
    return (err as InklineConfigError).diagnostic;
  }
  throw new Error("expected an InklineConfigError, but nothing was thrown");
}

describe("resolveOptions", () => {
  it("resolves with all defaults", () => {
    const opts = resolveOptions({ targets: ["react"] });

    expect(opts.targets).toEqual(["react"]);
    expect(opts.outDir).toBe("dist");
    expect(opts.sourceMap).toBe("external");
    expect(opts.targetOptions).toEqual({});
    expect(opts.plugins).toEqual([]);
    expect(opts.verbose).toBe(false);
  });

  it("accepts multiple targets", () => {
    const opts = resolveOptions({ targets: ["react", "vue", "solid"] });
    expect(opts.targets).toEqual(["react", "vue", "solid"]);
  });

  it("preserves custom outDir", () => {
    const opts = resolveOptions({ targets: ["react"], outDir: "build" });
    expect(opts.outDir).toBe("build");
  });

  it("preserves custom sourceMap mode", () => {
    const opts = resolveOptions({ targets: ["react"], sourceMap: "inline" });
    expect(opts.sourceMap).toBe("inline");
  });

  it("preserves sourceMap none", () => {
    const opts = resolveOptions({ targets: ["react"], sourceMap: "none" });
    expect(opts.sourceMap).toBe("none");
  });

  it("preserves verbose flag", () => {
    const opts = resolveOptions({ targets: ["react"], verbose: true });
    expect(opts.verbose).toBe(true);
  });

  it("preserves target options", () => {
    const opts = resolveOptions({
      targets: ["react"],
      targetOptions: { react: { strict: true } },
    });
    expect(opts.targetOptions).toEqual({ react: { strict: true } });
  });

  it("preserves plugins", () => {
    const plugin = { name: "test", hooks: {} };
    const opts = resolveOptions({ targets: ["react"], plugins: [plugin] });
    expect(opts.plugins).toEqual([plugin]);
  });

  it("throws INK0081 on empty targets, listing the valid targets", () => {
    const diagnostic = configErrorFrom(() => resolveOptions({ targets: [] }));

    expect(diagnostic.code).toBe("INK0081");
    expect(diagnostic.severity).toBe("error");
    expect(diagnostic.title).toBe("No compilation target specified");
    expect(diagnostic.help).toContain("react, solid, vue, svelte, angular, qwik, astro");
    expect(diagnostic.url).toBe("https://docs.inkline.dev/diagnostics/INK0081");
  });

  it("throws INK0081 on undefined config with no targets", () => {
    expect(configErrorFrom(() => resolveOptions(undefined)).code).toBe("INK0081");
  });

  it("throws INK0082 on unknown target, listing the valid targets", () => {
    const diagnostic = configErrorFrom(() => resolveOptions({ targets: ["unknown" as "react"] }));

    expect(diagnostic.code).toBe("INK0082");
    expect(diagnostic.title).toBe('Unknown target "unknown"');
    expect(diagnostic.help).toContain("react, solid, vue, svelte, angular, qwik, astro");
  });

  it("suggests the closest target for a near miss", () => {
    expect(configErrorFrom(() => resolveOptions({ targets: ["reakt" as "react"] })).help).toContain(
      'Did you mean "react"?',
    );
  });

  it("offers no suggestion when nothing is close", () => {
    expect(
      configErrorFrom(() => resolveOptions({ targets: ["nuxt" as "react"] })).help,
    ).not.toContain("Did you mean");
  });

  it("throws INK0083 when the registry does not provide a requested target", () => {
    const registry = createRegistry();
    registry.register(reactTarget);
    const diagnostic = configErrorFrom(() =>
      resolveOptions({ targets: ["react", "vue"], registry }),
    );

    expect(diagnostic.code).toBe("INK0083");
    expect(diagnostic.title).toBe('Target "vue" is not present in the configured registry');
    expect(diagnostic.help).toContain("react");
  });

  it("reports an empty registry as providing (none)", () => {
    const diagnostic = configErrorFrom(() =>
      resolveOptions({ targets: ["react"], registry: createRegistry() }),
    );

    expect(diagnostic.help).toContain("(none)");
  });

  it("accepts all valid target names", () => {
    const allTargets = ["react", "solid", "vue", "svelte", "angular", "qwik", "astro"] as const;
    const opts = resolveOptions({ targets: allTargets });
    expect(opts.targets).toEqual(allTargets);
  });

  it("default registry has built-in targets", () => {
    const opts = resolveOptions({ targets: ["react"] });
    expect(opts.registry.get("react")).toBeDefined();
    expect(opts.registry.has("react")).toBe(true);
    expect(opts.registry.list().length).toBeGreaterThan(0);
  });

  it("defaults targetOutDir to empty object", () => {
    const opts = resolveOptions({ targets: ["react"] });
    expect(opts.targetOutDir).toEqual({});
  });

  it("preserves targetOutDir mapping", () => {
    const opts = resolveOptions({
      targets: ["react", "vue"],
      targetOutDir: {
        react: "../react/generated",
        vue: "../vue/generated",
      },
    });
    expect(opts.targetOutDir).toEqual({
      react: "../react/generated",
      vue: "../vue/generated",
    });
  });

  it("preserves partial targetOutDir", () => {
    const opts = resolveOptions({
      targets: ["react", "vue"],
      targetOutDir: { react: "./out/react" },
    });
    expect(opts.targetOutDir).toEqual({ react: "./out/react" });
  });
});
