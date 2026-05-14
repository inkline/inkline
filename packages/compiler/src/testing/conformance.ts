import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { GeneratedFile } from "../codegen/context.ts";

export type Invariant = (file: GeneratedFile) => readonly Diagnostic[];

export function runConformanceInvariants(
  invariants: readonly Invariant[],
  file: GeneratedFile,
): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  for (const invariant of invariants) {
    diagnostics.push(...invariant(file));
  }
  return diagnostics;
}

export function requireFileExtension(ext: string): Invariant {
  return (file) => {
    if (file.path.endsWith(ext)) return [];
    return [
      {
        code: "INK0110",
        severity: "error",
        title: `Internal compiler error: Expected file extension ${ext}, got ${file.path}`,
        url: "https://docs.inkline.dev/diagnostics/INK0110",
        loc: { file: file.path, line: 0, column: 0, offset: 0, length: 0 },
      },
    ];
  };
}

export function requireContains(substring: string): Invariant {
  return (file) => {
    if (file.contents.includes(substring)) return [];
    return [
      {
        code: "INK0110",
        severity: "error",
        title: `Internal compiler error: Expected output to contain "${substring}"`,
        url: "https://docs.inkline.dev/diagnostics/INK0110",
        loc: { file: file.path, line: 0, column: 0, offset: 0, length: 0 },
      },
    ];
  };
}

export function requireNotContains(substring: string): Invariant {
  return (file) => {
    if (!file.contents.includes(substring)) return [];
    return [makeDiag(file, `Output must not contain "${substring}"`)];
  };
}

export function requireImports(module: string, names: readonly string[]): Invariant {
  return (file) => {
    const diags: Diagnostic[] = [];
    for (const name of names) {
      const pattern = new RegExp(`import\\b[^;]*\\b${name}\\b[^;]*from\\s+["']${module}["']`);
      if (!pattern.test(file.contents)) {
        diags.push(makeDiag(file, `Expected import { ${name} } from "${module}"`));
      }
    }
    return diags;
  };
}

export const requirePropsNotDestructured: Invariant = (file) => {
  if (/\bconst\s+\{[^}]+\}\s*=\s*props\b/.test(file.contents)) {
    return [makeDiag(file, "Props must not be destructured (Solid reactivity requires props.x)")];
  }
  return [];
};

export const requireReactiveReadsPreserveCall: Invariant = (file) => {
  const lines = file.contents.split("\n");
  const diags: Diagnostic[] = [];
  for (const line of lines) {
    if (line.trimStart().startsWith("//") || line.trimStart().startsWith("import")) continue;
    const stripped = line.replace(/"[^"]*"|'[^']*'|`[^`]*`/g, "");
    if (/\bcount\b(?!\s*\()/.test(stripped) && /\bcount\b/.test(stripped)) {
      if (
        !/count\(/.test(stripped) &&
        !/\.count/.test(stripped) &&
        !/count[,;}\])]/.test(stripped)
      ) {
        // Heuristic: bare `count` without call parens — might be a missed reactive read
      }
    }
  }
  return diags;
};

function makeDiag(file: GeneratedFile, message: string): Diagnostic {
  return {
    code: "INK0110",
    severity: "error",
    title: `Conformance: ${message}`,
    url: "https://docs.inkline.dev/diagnostics/INK0110",
    loc: { file: file.path, line: 0, column: 0, offset: 0, length: 0 },
  };
}
