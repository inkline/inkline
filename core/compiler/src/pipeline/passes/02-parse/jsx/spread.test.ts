import { describe, it, expect } from "vitest";
import { builtinRegistry } from "../../../../codegen/registry.ts";
import { createDiagnosticCollector } from "../../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../../core/options.ts";
import { SymbolTable } from "../../../../ir/reactivity.ts";
import type { PassContext } from "../../../types.ts";
import { programPass } from "../../01-program.ts";
import { parsePass } from "../index.ts";

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

async function diagnose(source: string) {
  const ctx = makeCtx();
  const artifact = await programPass.run({ fileName: "T.ink.tsx", source }, ctx);
  await parsePass.run(artifact, ctx);
  return ctx.diagnostics.freeze().filter((d) => d.code === "INK0071");
}

const component = (body: string) => `
  import { defineComponent } from "@inkline/core";
  export default defineComponent((props: { label: string }) => {
    return ${body};
  });
`;

describe("INK0071 — discarded JSX spread attributes", () => {
  it("reports a spread on an element with file, line, and column", async () => {
    const diags = await diagnose(component("<button {...props} />"));
    expect(diags).toHaveLength(1);
    expect(diags[0]!.severity).toBe("error");
    expect(diags[0]!.loc.file).toBe("T.ink.tsx");
    expect(diags[0]!.loc.line).toBe(4);
    expect(diags[0]!.loc.column).toBe(20);
  });

  it("help text tells the author what to do and has no unsubstituted placeholders", async () => {
    const diags = await diagnose(component("<button {...props} />"));
    expect(diags[0]!.help).toContain("Enumerate the attributes explicitly");
    expect(diags[0]!.help).not.toMatch(/\{\w+\}/);
  });

  it("reports a spread on a component instance", async () => {
    const diags = await diagnose(component("<Child {...props} />"));
    expect(diags).toHaveLength(1);
  });

  it("reports spreads nested in control flow and list callbacks exactly once each", async () => {
    const diags = await diagnose(
      component(`(
        <div>
          {props.label ? <b {...props} /> : <i {...props} />}
          {[1, 2].map((n) => (
            <span {...props}>{n}</span>
          ))}
        </div>
      )`),
    );
    expect(diags).toHaveLength(3);
  });

  it("does not report when no spread is present", async () => {
    const diags = await diagnose(component("<button title={props.label} />"));
    expect(diags).toHaveLength(0);
  });
});
