import type * as ts from "typescript";

import type { IRComponent } from "./nodes.ts";
import type { Diagnostic } from "./types.ts";

/**
 * The result of parsing a single `.ink.tsx` file. Carries the original
 * `ts.SourceFile` so generators can walk it where the IR's normalized form
 * isn't enough (rare, but useful for jsdoc passthrough and type queries).
 */
export interface IRModule {
  /** Absolute or canonical source file path. */
  file: string;
  components: IRComponent[];
  /** Preserved import declarations — required for codegen to map external symbols. */
  imports: ts.ImportDeclaration[];
  diagnostics: Diagnostic[];
  /** The original SourceFile, preserved so generators may walk it where needed. */
  sourceFile: ts.SourceFile;
}
