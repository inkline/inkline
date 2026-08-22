import { execFile } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve, dirname, isAbsolute } from "node:path";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { GeneratedFile, TargetConformanceSpec } from "../codegen/context.ts";
import { PACKAGE_ROOT } from "./harness.ts";

export interface TypecheckResult {
  readonly pass: boolean;
  readonly diagnostics: readonly Diagnostic[];
  readonly raw: string;
}

/** Extensions plain `tsc` can read. `.vue`/`.svelte` need vue-tsc/svelte-check. */
const TYPECHECKABLE = [".ts", ".tsx", ".mts", ".cts"];

/**
 * Specifiers a bundler resolves that have no on-disk counterpart. Without these the gate reports
 * a missing stylesheet as an emitted-output type error, which is noise, not a defect.
 */
const AMBIENT_DECLARATIONS = 'declare module "*.css";\ndeclare module "virtual:*";\n';

export function isTypecheckable(file: GeneratedFile): boolean {
  return TYPECHECKABLE.some((ext) => file.path.endsWith(ext));
}

export async function typecheckEmittedForTarget(
  conformance: TargetConformanceSpec,
  files: readonly GeneratedFile[],
): Promise<TypecheckResult> {
  if (files.length === 0) return { pass: true, diagnostics: [], raw: "" };

  const tsconfigSrc = conformance.typecheck.tsconfig;
  if (tsconfigSrc === "" || !isAbsolute(tsconfigSrc) || !existsSync(tsconfigSrc)) {
    // A gate that cannot start must never read as a pass. Relative paths are rejected outright:
    // they resolve against the suite's cwd, which is what made this harness vacuous (UXF-205).
    return toolchainFailure(
      `typecheck.tsconfig is not an existing absolute path: "${tsconfigSrc}"`,
    );
  }

  const typecheckable = files.filter(isTypecheckable);
  if (typecheckable.length === 0) {
    return toolchainFailure(
      `no typecheckable files among [${files.map((f) => f.path).join(", ")}] — ` +
        `plain tsc reads ${TYPECHECKABLE.join("/")} only`,
    );
  }

  let tscBin: string;
  try {
    tscBin = resolveTscBin();
  } catch (err) {
    return toolchainFailure(`cannot resolve the tsc binary from @inkline/compiler: ${String(err)}`);
  }

  // Inside the package's node_modules so that bare imports in emitted output (`react`, `solid-js`)
  // and `types` entries resolve by walking up to core/compiler/node_modules.
  const tmpRoot = join(PACKAGE_ROOT, "node_modules", ".tmp");
  mkdirSync(tmpRoot, { recursive: true });
  const tmp = mkdtempSync(join(tmpRoot, "ink-typecheck-"));
  try {
    const emittedDir = join(tmp, "__emitted__");
    mkdirSync(emittedDir, { recursive: true });

    for (const file of typecheckable) {
      const dest = join(emittedDir, file.path);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, file.contents, "utf-8");
    }
    writeFileSync(join(emittedDir, "__ambient__.d.ts"), AMBIENT_DECLARATIONS, "utf-8");

    const tsconfigDest = join(tmp, "tsconfig.json");
    writeFileSync(
      tsconfigDest,
      JSON.stringify({
        extends: tsconfigSrc,
        compilerOptions: { noEmit: true },
        include: ["./__emitted__/**/*"],
      }),
      "utf-8",
    );

    const { code, raw } = await runTsc(tscBin, tsconfigDest);
    const diagnostics = parseTscOutput(raw);
    if (diagnostics.length > 0) return { pass: false, diagnostics, raw };
    if (code !== 0) {
      return { ...toolchainFailure(`tsc exited ${code} with no parseable diagnostics`), raw };
    }
    return { pass: true, diagnostics: [], raw };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

/**
 * The workspace TypeScript, resolved from this package — never `npx`, which in a directory without
 * `node_modules` prints a refusal containing no `error TS` and so read as a clean pass (UXF-205).
 * The bin name is read from package.json rather than hardcoded: TS 6 ships `tsc6`, TS 5 `tsc`.
 */
function resolveTscBin(): string {
  const require_ = createRequire(import.meta.url);
  const pkgPath = require_.resolve("typescript/package.json");
  const bin = (require_(pkgPath) as { bin?: string | Record<string, string> }).bin;
  const entry = typeof bin === "string" ? bin : Object.values(bin ?? {})[0];
  if (!entry) throw new Error(`typescript at ${pkgPath} declares no bin`);
  return resolve(dirname(pkgPath), entry);
}

function runTsc(tscBin: string, project: string): Promise<{ code: number; raw: string }> {
  return new Promise((done) => {
    execFile(
      process.execPath,
      [tscBin, "--project", project, "--pretty", "false"],
      { timeout: 120_000, maxBuffer: 32 * 1024 * 1024 },
      (err, stdout, stderr) => {
        const raw = (stdout ?? "") + (stderr ?? "");
        // `err.code` is tsc's exit status; a spawn/timeout failure has no numeric code.
        const code = err ? (typeof err.code === "number" ? err.code : 1) : 0;
        done({ code, raw });
      },
    );
  });
}

function parseTscOutput(raw: string): Diagnostic[] {
  return raw
    .split("\n")
    .filter((l) => /error TS\d+:/.test(l))
    .map((line) => makeDiagnostic(`TypeScript: ${line.trim()}`));
}

function toolchainFailure(reason: string): TypecheckResult {
  return {
    pass: false,
    diagnostics: [makeDiagnostic(`Typecheck harness did not run: ${reason}`)],
    raw: "",
  };
}

function makeDiagnostic(title: string): Diagnostic {
  return {
    code: "INK0110",
    severity: "error",
    title,
    url: "https://docs.inkline.dev/diagnostics/INK0110",
    loc: { file: "", line: 0, column: 0, offset: 0, length: 0 },
  };
}
