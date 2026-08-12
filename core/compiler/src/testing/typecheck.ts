// Typechecks emitted output by running the real TypeScript compiler over it.
//
// This runs `ts.createProgram` in-process rather than spawning `tsc`. Spawning was how this helper
// silently stopped working: `npx tsc` resolves to the `tsc` npm package — a decoy that prints
// "This is not the tsc command you are looking for" and exits — and the output parser treated any
// stdout without an `error TS` line as a pass. Every emitted file passed, including deliberately
// ill-typed ones. `typecheck.test.ts` pins that failure mode so it cannot come back.
//
// A file the TypeScript compiler cannot read (`.vue`, `.svelte`, `.astro`) is not typechecked here;
// those need `vue-tsc` / `svelte-check` / `astro check`. `checkedFiles` reports how many files
// actually reached the compiler so callers can tell real coverage from an empty run.

import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as ts from "typescript";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { GeneratedFile, TargetConformanceSpec } from "../codegen/context.ts";

export interface TypecheckResult {
  readonly pass: boolean;
  readonly diagnostics: readonly Diagnostic[];
  readonly raw: string;
  /**
   * How many emitted files the TypeScript compiler actually read. `0` means nothing was
   * typechecked — either the target emits non-TS files or it has no tsconfig — so a `pass` of
   * `true` alongside `checkedFiles: 0` asserts nothing.
   */
  readonly checkedFiles: number;
}

/** Extensions `tsc` can typecheck. Everything else needs a framework-specific checker. */
const CHECKABLE = /\.(ts|tsx|mts|cts)$/;

const PKG_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * Typecheck `files` with `conformance`'s tsconfig.
 *
 * Fails loudly when the tsconfig is missing or unreadable — a broken config must not read as a
 * clean typecheck. Returns `checkedFiles: 0` (and no diagnostics) when the target has no tsconfig
 * configured or emits nothing `tsc` can read; that is a coverage gap for the caller to assert on,
 * not a failure.
 */
export async function typecheckEmittedForTarget(
  conformance: TargetConformanceSpec,
  files: readonly GeneratedFile[],
): Promise<TypecheckResult> {
  const checkable = files.filter((f) => CHECKABLE.test(f.path));
  if (checkable.length === 0) return { pass: true, diagnostics: [], raw: "", checkedFiles: 0 };

  const tsconfigPath = conformance.typecheck.tsconfig;
  if (tsconfigPath === "") return { pass: true, diagnostics: [], raw: "", checkedFiles: 0 };

  const resolved = resolve(tsconfigPath);
  if (!existsSync(resolved)) {
    return fail(`tsconfig not found: ${resolved}`);
  }

  const config = readCompilerOptions(resolved);
  if (config.error !== undefined) return fail(config.error);
  const options = config.options;

  const tmp = mkdtempSync(join(scratchRoot(), "run-"));
  try {
    const paths: string[] = [];
    for (const file of checkable) {
      const dest = join(tmp, file.path);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, file.contents, "utf-8");
      paths.push(dest);
    }

    // Emitted output imports things this harness deliberately does not materialise: sibling
    // components from other fixtures, `virtual:styleframe`, the synthesised `./recipe` module, and
    // scoped-style `.css` side-effect imports. A wildcard ambient module resolves those to `any`.
    // Real packages (react, solid-js, …) still resolve normally — wildcards are the last resort.
    const ambient = join(tmp, "__ambient.d.ts");
    writeFileSync(ambient, 'declare module "*";\n', "utf-8");
    paths.push(ambient);

    const program = ts.createProgram(paths, { ...options, noEmit: true });
    const errors = [
      ...program.getSyntacticDiagnostics(),
      ...program.getSemanticDiagnostics(),
    ].filter((d) => d.category === ts.DiagnosticCategory.Error);

    const raw = ts.formatDiagnostics(errors, {
      getCanonicalFileName: (f) => f,
      getCurrentDirectory: () => tmp,
      getNewLine: () => "\n",
    });

    return {
      pass: errors.length === 0,
      diagnostics: errors.map((d) => toInkDiagnostic(d, tmp)),
      raw,
      checkedFiles: checkable.length,
    };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

/**
 * Emitted files are written under the compiler package's own `node_modules` so Node's resolution
 * finds `react`, `solid-js`, … from the nearest `node_modules` without any path mapping.
 */
function scratchRoot(): string {
  const dir = join(PKG_ROOT, "node_modules", ".cache", "ink-typecheck");
  mkdirSync(dir, { recursive: true });
  return dir;
}

interface ReadOptionsResult {
  readonly options: ts.CompilerOptions;
  readonly error?: string;
}

function readCompilerOptions(tsconfigPath: string): ReadOptionsResult {
  let text: string;
  try {
    text = readFileSync(tsconfigPath, "utf-8");
  } catch (e) {
    return { options: {}, error: `tsconfig unreadable: ${tsconfigPath} (${(e as Error).message})` };
  }

  const parsed = ts.parseConfigFileTextToJson(tsconfigPath, text);
  if (parsed.error) {
    return { options: {}, error: `tsconfig is not valid JSON: ${tsconfigPath}` };
  }

  const converted = ts.convertCompilerOptionsFromJson(
    (parsed.config as { compilerOptions?: unknown }).compilerOptions ?? {},
    dirname(tsconfigPath),
    tsconfigPath,
  );
  if (converted.errors.length > 0) {
    const messages = converted.errors
      .map((e) => ts.flattenDiagnosticMessageText(e.messageText, " "))
      .join("; ");
    return {
      options: {},
      error: `tsconfig has invalid compilerOptions: ${tsconfigPath} (${messages})`,
    };
  }

  return { options: converted.options };
}

function fail(message: string): TypecheckResult {
  return {
    pass: false,
    diagnostics: [
      {
        code: "INK0110",
        severity: "error",
        title: `Typecheck harness: ${message}`,
        url: "https://docs.inkline.dev/diagnostics/INK0110",
        loc: { file: "", line: 0, column: 0, offset: 0, length: 0 },
      },
    ],
    raw: message,
    checkedFiles: 0,
  };
}

function toInkDiagnostic(d: ts.Diagnostic, root: string): Diagnostic {
  const message = ts.flattenDiagnosticMessageText(d.messageText, " ");
  const file = d.file?.fileName.startsWith(root)
    ? d.file.fileName.slice(root.length + 1)
    : (d.file?.fileName ?? "");
  const pos =
    d.file && d.start !== undefined
      ? d.file.getLineAndCharacterOfPosition(d.start)
      : { line: 0, character: 0 };

  return {
    code: "INK0110",
    severity: "error",
    title: `TypeScript TS${d.code}: ${message}`,
    url: "https://docs.inkline.dev/diagnostics/INK0110",
    loc: {
      file,
      line: pos.line + 1,
      column: pos.character + 1,
      offset: d.start ?? 0,
      length: d.length ?? 0,
    },
  };
}
