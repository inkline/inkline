import { cRaw } from "../code-ir/builders.ts";
import type { CRaw } from "../code-ir/nodes.ts";
import type { ComponentImport } from "../context.ts";

export function emitComponentImports(
  imports: readonly ComponentImport[],
  extension: string,
  defaultExport: boolean,
  componentSuffix?: string,
): CRaw[] {
  return imports.map((imp) => {
    const path = `${imp.relativePath}${extension}`;
    const exportedName = `${imp.componentName}${componentSuffix ?? ""}`;

    if (defaultExport) {
      return cRaw({ text: `import ${imp.localName} from "${path}";` });
    }
    if (imp.localName === exportedName) {
      return cRaw({ text: `import { ${exportedName} } from "${path}";` });
    }
    return cRaw({ text: `import { ${exportedName} as ${imp.localName} } from "${path}";` });
  });
}
