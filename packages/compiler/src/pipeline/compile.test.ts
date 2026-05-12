import { describe, it, expect } from "vitest";
import { compile } from "./compile.ts";

describe("compile", () => {
  it("returns a CompileResult with empty files and diagnostics", async () => {
    const result = await compile(
      { fileName: "test.tsx", source: "const x = 1;" },
      { targets: ["react"] },
    );
    expect(result.files).toEqual({});
    expect(result.diagnostics).toEqual([]);
    expect(result.module).toBeUndefined();
  });

  it("throws on unknown target", async () => {
    await expect(
      compile({ fileName: "test.tsx", source: "" }, { targets: ["unknown" as "react"] }),
    ).rejects.toThrow('Unknown target: "unknown"');
  });

  it("throws on empty targets", async () => {
    await expect(compile({ fileName: "test.tsx", source: "" }, { targets: [] })).rejects.toThrow(
      "At least one target is required",
    );
  });

  it("accepts JSX source without errors", async () => {
    const source = `
      const el = <div className="test">Hello</div>;
    `;
    const result = await compile({ fileName: "test.tsx", source }, { targets: ["react"] });
    expect(result.diagnostics).toEqual([]);
  });

  it("works with multiple targets", async () => {
    const result = await compile(
      { fileName: "test.tsx", source: "const x = 1;" },
      { targets: ["react", "vue", "solid"] },
    );
    expect(result.diagnostics).toEqual([]);
  });
});
