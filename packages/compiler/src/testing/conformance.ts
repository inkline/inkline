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
