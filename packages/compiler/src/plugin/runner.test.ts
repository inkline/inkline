import { describe, it, expect, vi } from "vitest";
import { PluginRunner } from "./runner.ts";
import type { Plugin, PluginContext } from "./types.ts";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { GeneratedFile } from "../codegen/context.ts";
import { resolveOptions } from "../core/options.ts";

function makeCtx(): PluginContext & { diags: Diagnostic[] } {
  const diags: Diagnostic[] = [];
  return {
    diags,
    pushDiagnostic: (d) => diags.push(d),
    options: resolveOptions({ targets: ["react", "vue"] }),
  };
}

const fileA: GeneratedFile = { path: "a.tsx", contents: "a" };
const fileB: GeneratedFile = { path: "b.tsx", contents: "b" };

describe("PluginRunner", () => {
  describe("invokeIrPost", () => {
    it("calls plugins in registration order", async () => {
      const order: string[] = [];
      const p1: Plugin = {
        name: "p1",
        hooks: {
          "ir:post": () => {
            order.push("p1");
          },
        },
      };
      const p2: Plugin = {
        name: "p2",
        hooks: {
          "ir:post": () => {
            order.push("p2");
          },
        },
      };
      const runner = new PluginRunner([p1, p2]);
      await runner.invokeIrPost({}, makeCtx());
      expect(order).toEqual(["p1", "p2"]);
    });

    it("skips plugins without ir:post hook", async () => {
      const called: string[] = [];
      const p1: Plugin = { name: "p1", hooks: {} };
      const p2: Plugin = {
        name: "p2",
        hooks: {
          "ir:post": () => {
            called.push("p2");
          },
        },
      };
      const runner = new PluginRunner([p1, p2]);
      await runner.invokeIrPost({}, makeCtx());
      expect(called).toEqual(["p2"]);
    });

    it("awaits async plugins", async () => {
      const order: string[] = [];
      const p1: Plugin = {
        name: "p1",
        hooks: {
          "ir:post": async () => {
            await new Promise((r) => setTimeout(r, 1));
            order.push("p1");
          },
        },
      };
      const p2: Plugin = {
        name: "p2",
        hooks: {
          "ir:post": () => {
            order.push("p2");
          },
        },
      };
      const runner = new PluginRunner([p1, p2]);
      await runner.invokeIrPost({}, makeCtx());
      expect(order).toEqual(["p1", "p2"]);
    });

    it("catches throwing plugin and pushes INK0090", async () => {
      const p1: Plugin = {
        name: "bad-plugin",
        hooks: {
          "ir:post": () => {
            throw new Error("oops");
          },
        },
      };
      const p2: Plugin = {
        name: "good-plugin",
        hooks: {
          "ir:post": () => {},
        },
      };
      const runner = new PluginRunner([p1, p2]);
      const ctx = makeCtx();
      await runner.invokeIrPost({}, ctx);

      expect(ctx.diags).toHaveLength(1);
      expect(ctx.diags[0]!.code).toBe("INK0090");
      expect(ctx.diags[0]!.title).toContain("bad-plugin");
      expect(ctx.diags[0]!.title).toContain("oops");
    });

    it("continues after throwing plugin", async () => {
      const called: string[] = [];
      const p1: Plugin = {
        name: "bad",
        hooks: {
          "ir:post": () => {
            throw new Error("fail");
          },
        },
      };
      const p2: Plugin = {
        name: "good",
        hooks: {
          "ir:post": () => {
            called.push("good");
          },
        },
      };
      const runner = new PluginRunner([p1, p2]);
      await runner.invokeIrPost({}, makeCtx());
      expect(called).toEqual(["good"]);
    });

    it("does not filter by targets for ir:post", async () => {
      const called: string[] = [];
      const p1: Plugin = {
        name: "react-only",
        targets: ["react"],
        hooks: {
          "ir:post": () => {
            called.push("react-only");
          },
        },
      };
      const runner = new PluginRunner([p1]);
      await runner.invokeIrPost({}, makeCtx());
      expect(called).toEqual(["react-only"]);
    });

    it("logs to console.warn when verbose", async () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const p1: Plugin = {
        name: "bad",
        hooks: {
          "ir:post": () => {
            throw new Error("verbose-err");
          },
        },
      };
      const runner = new PluginRunner([p1]);
      const ctx = makeCtx();
      (ctx.options as { verbose: boolean }).verbose = true;
      await runner.invokeIrPost({}, ctx);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe("invokeCodePost", () => {
    it("returns original files when no plugin replaces", async () => {
      const p1: Plugin = {
        name: "noop",
        hooks: { "code:post": () => {} },
      };
      const runner = new PluginRunner([p1]);
      const result = await runner.invokeCodePost("react", [fileA], makeCtx());
      expect(result).toEqual([fileA]);
    });

    it("returns replacement files from plugin", async () => {
      const p1: Plugin = {
        name: "replacer",
        hooks: { "code:post": () => [fileB] },
      };
      const runner = new PluginRunner([p1]);
      const result = await runner.invokeCodePost("react", [fileA], makeCtx());
      expect(result).toEqual([fileB]);
    });

    it("threads replacement files to next plugin", async () => {
      const received: string[][] = [];
      const p1: Plugin = {
        name: "replace-with-b",
        hooks: {
          "code:post": (_t, files) => {
            received.push(files.map((f) => f.path));
            return [fileB];
          },
        },
      };
      const p2: Plugin = {
        name: "observer",
        hooks: {
          "code:post": (_t, files) => {
            received.push(files.map((f) => f.path));
          },
        },
      };
      const runner = new PluginRunner([p1, p2]);
      await runner.invokeCodePost("react", [fileA], makeCtx());
      expect(received).toEqual([["a.tsx"], ["b.tsx"]]);
    });

    it("filters plugins by target", async () => {
      const called: string[] = [];
      const reactOnly: Plugin = {
        name: "react-only",
        targets: ["react"],
        hooks: {
          "code:post": () => {
            called.push("react-only");
          },
        },
      };
      const vueOnly: Plugin = {
        name: "vue-only",
        targets: ["vue"],
        hooks: {
          "code:post": () => {
            called.push("vue-only");
          },
        },
      };
      const runner = new PluginRunner([reactOnly, vueOnly]);
      await runner.invokeCodePost("react", [fileA], makeCtx());
      expect(called).toEqual(["react-only"]);
    });

    it("includes plugins with no targets (applies to all)", async () => {
      const called: string[] = [];
      const universal: Plugin = {
        name: "universal",
        hooks: {
          "code:post": () => {
            called.push("universal");
          },
        },
      };
      const runner = new PluginRunner([universal]);
      await runner.invokeCodePost("vue", [fileA], makeCtx());
      expect(called).toEqual(["universal"]);
    });

    it("catches throwing plugin and continues with last good files", async () => {
      const p1: Plugin = {
        name: "good",
        hooks: { "code:post": () => [fileB] },
      };
      const p2: Plugin = {
        name: "bad",
        hooks: {
          "code:post": () => {
            throw new Error("boom");
          },
        },
      };
      const p3: Plugin = {
        name: "observer",
        hooks: {
          "code:post": (_t, files) => {
            return files;
          },
        },
      };
      const runner = new PluginRunner([p1, p2, p3]);
      const ctx = makeCtx();
      const result = await runner.invokeCodePost("react", [fileA], ctx);

      expect(result).toEqual([fileB]);
      expect(ctx.diags).toHaveLength(1);
      expect(ctx.diags[0]!.code).toBe("INK0090");
    });
  });
});
