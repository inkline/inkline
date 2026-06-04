import { cRaw } from "../code-ir/builders.ts";
import type { CRaw } from "../code-ir/nodes.ts";
import type { ComponentImport } from "../context.ts";

export function emitComponentImports(
  imports: readonly ComponentImport[],
  extension: string,
  defaultExport: boolean,
  componentSuffix?: string,
): CRaw[] {
  return imports.flatMap((imp) => {
    const path = `${imp.relativePath}${extension}`;
    const exportedName = `${imp.componentName}${componentSuffix ?? ""}`;
    const namedParts = imp.namedTypeImports ?? [];
    const results: CRaw[] = [];

    if (imp.localName) {
      if (defaultExport) {
        const namedClause = namedParts.length > 0 ? `, { ${namedParts.join(", ")} }` : "";
        results.push(cRaw({ text: `import ${imp.localName}${namedClause} from "${path}";` }));
      } else if (imp.localName === exportedName) {
        results.push(cRaw({ text: `import { ${exportedName} } from "${path}";` }));
      } else {
        results.push(
          cRaw({ text: `import { ${exportedName} as ${imp.localName} } from "${path}";` }),
        );
      }
    }

    if (!defaultExport && namedParts.length > 0) {
      results.push(cRaw({ text: `import { ${namedParts.join(", ")} } from "${path}";` }));
    }

    if (!imp.localName && defaultExport && namedParts.length > 0) {
      results.push(cRaw({ text: `import { ${namedParts.join(", ")} } from "${path}";` }));
    }

    return results;
  });
}
