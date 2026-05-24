import { describe, it, expect } from "vitest";
import type { ComponentImport } from "../context.ts";
import { emitComponentImports } from "./component-imports.ts";

describe("emitComponentImports", () => {
  const imp: ComponentImport = {
    localName: "IBadgeBase",
    componentName: "IBadgeBase",
    relativePath: "../../headless/badge/IBadgeBase",
  };

  it("named export: import { Name } from path (no extension)", () => {
    const result = emitComponentImports([imp], "", false);
    expect(result[0]!.text).toBe('import { IBadgeBase } from "../../headless/badge/IBadgeBase";');
  });

  it("default export: import Name from path.vue", () => {
    const result = emitComponentImports([imp], ".vue", true);
    expect(result[0]!.text).toBe('import IBadgeBase from "../../headless/badge/IBadgeBase.vue";');
  });

  it("default export: import Name from path.svelte", () => {
    const result = emitComponentImports([imp], ".svelte", true);
    expect(result[0]!.text).toBe(
      'import IBadgeBase from "../../headless/badge/IBadgeBase.svelte";',
    );
  });

  it("angular: import { NameComponent as Name } from path.component", () => {
    const result = emitComponentImports([imp], ".component", false, "Component");
    expect(result[0]!.text).toBe(
      'import { IBadgeBaseComponent as IBadgeBase } from "../../headless/badge/IBadgeBase.component";',
    );
  });

  it("named export with alias when localName differs", () => {
    const aliased = { ...imp, localName: "Base" };
    const result = emitComponentImports([aliased], "", false);
    expect(result[0]!.text).toBe(
      'import { IBadgeBase as Base } from "../../headless/badge/IBadgeBase";',
    );
  });

  it("default export uses localName", () => {
    const aliased = { ...imp, localName: "Base" };
    const result = emitComponentImports([aliased], ".vue", true);
    expect(result[0]!.text).toBe('import Base from "../../headless/badge/IBadgeBase.vue";');
  });

  it("angular alias: import { NameComponent as Alias } from path.component", () => {
    const aliased = { ...imp, localName: "Base" };
    const result = emitComponentImports([aliased], ".component", false, "Component");
    expect(result[0]!.text).toBe(
      'import { IBadgeBaseComponent as Base } from "../../headless/badge/IBadgeBase.component";',
    );
  });

  it("handles multiple component imports", () => {
    const imports: ComponentImport[] = [
      imp,
      { localName: "IButton", componentName: "IButton", relativePath: "../button/IButton" },
    ];
    const result = emitComponentImports(imports, "", false);
    expect(result).toHaveLength(2);
    expect(result[0]!.text).toContain("IBadgeBase");
    expect(result[1]!.text).toContain("IButton");
  });

  it("returns empty array for no imports", () => {
    expect(emitComponentImports([], "", false)).toEqual([]);
  });
});
