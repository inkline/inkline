import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { DIAGNOSTICS, type DiagnosticCode } from "./codes.ts";

/**
 * `DIAGNOSTICS` is the single source of truth for every code's severity. The docs restate it by
 * hand, and until this test existed nothing compared the two: in #548 INK0083 moved
 * `warning` -> `error` and every table kept saying `warning` with a green suite.
 *
 * Scope, deliberately: the **tabular** restatements only. Prose that mentions a code by name
 * (`README.md` "Configuration" section) is not machine-checkable without pinning editorial
 * sentences, and is left as a declared gap with a pointer comment at the prose itself.
 *
 * Titles are also out of scope: neither table restates `title`, they paraphrase it
 * ("Plugin threw" for `Plugin '{name}' threw: {message}`). Asserting them would mean replacing
 * the editorial columns with generated strings — the codegen approach this test exists to avoid.
 * Code + severity is what drifted, and what is checked.
 */

const PACKAGE_ROOT = resolve(import.meta.dirname, "../../..");

/** Every doc that restates the catalog. Scanned whether or not it currently holds a table. */
const SCANNED_DOCS = ["README.md", "docs/api-reference.md", "docs/adding-a-diagnostic.md"] as const;

/**
 * The table that must list *every* code. `README.md` deliberately lists only "the ones most
 * authors hit", so completeness is asserted here alone; `README.md` rows are still checked for
 * code existence and severity.
 */
const COMPLETE_TABLE = "docs/adding-a-diagnostic.md";

/** Files that must still contain a table at all, so deleting one cannot make this test vacuous. */
const DOCS_WITH_TABLES = ["README.md", COMPLETE_TABLE];

interface DocRow {
  readonly file: string;
  /** 1-based, so a failure message can be pasted straight into an editor. */
  readonly line: number;
  readonly code: string;
  readonly severity: string;
}

/** `INK0083`, `` `INK0083` `` and `[INK0083](https://…)` all name the same code. */
const CODE_CELL = /^\[?`?(INK\d{4})`?\]?(?:\([^)]*\))?$/;

const SEPARATOR_CELL = /^:?-{3,}:?$/;

function splitTableRow(line: string): string[] | undefined {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) return undefined;
  return trimmed
    .slice(1, trimmed.endsWith("|") ? -1 : undefined)
    .split("|")
    .map((cell) => cell.trim());
}

/**
 * Finds every markdown table carrying both a `Code` and a `Severity` header and returns its
 * `INKxxxx` rows. Header-driven rather than position-driven so a column inserted before
 * `Severity` doesn't silently shift what gets compared.
 */
function parseDiagnosticTables(relativePath: string): DocRow[] {
  const lines = readFileSync(join(PACKAGE_ROOT, relativePath), "utf8").split("\n");
  const rows: DocRow[] = [];
  let codeIndex = -1;
  let severityIndex = -1;
  let inFence = false;

  for (const [index, line] of lines.entries()) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const cells = splitTableRow(line);
    if (!cells) {
      codeIndex = -1;
      severityIndex = -1;
      continue;
    }
    if (cells.every((cell) => SEPARATOR_CELL.test(cell))) continue;

    const headers = cells.map((cell) => cell.toLowerCase().replaceAll("`", ""));
    const headerCode = headers.indexOf("code");
    const headerSeverity = headers.indexOf("severity");
    if (headerCode !== -1 && headerSeverity !== -1) {
      codeIndex = headerCode;
      severityIndex = headerSeverity;
      continue;
    }
    if (codeIndex === -1) continue;

    const code = CODE_CELL.exec(cells[codeIndex] ?? "")?.[1];
    if (!code) continue;
    rows.push({
      file: relativePath,
      line: index + 1,
      code,
      severity: (cells[severityIndex] ?? "").replaceAll("`", ""),
    });
  }

  return rows;
}

describe("diagnostics documentation tables", () => {
  const rows = SCANNED_DOCS.flatMap(parseDiagnosticTables);
  const catalogCodes = Object.keys(DIAGNOSTICS) as DiagnosticCode[];

  it.each(DOCS_WITH_TABLES)("%s still contains a diagnostics table", (file) => {
    expect(rows.filter((row) => row.file === file).length).toBeGreaterThan(0);
  });

  it("every documented code exists in DIAGNOSTICS", () => {
    const orphans = rows
      .filter((row) => !(row.code in DIAGNOSTICS))
      .map((row) => `${row.file}:${row.line} documents ${row.code}, absent from DIAGNOSTICS`);
    expect(orphans, `Stale documentation rows:\n${orphans.join("\n")}`).toEqual([]);
  });

  it("every documented severity matches DIAGNOSTICS", () => {
    const mismatches = rows
      .filter((row) => row.code in DIAGNOSTICS)
      .filter((row) => row.severity !== DIAGNOSTICS[row.code as DiagnosticCode].severity)
      .map(
        (row) =>
          `${row.file}:${row.line} says ${row.code} is "${row.severity}", ` +
          `catalog says "${DIAGNOSTICS[row.code as DiagnosticCode].severity}"`,
      );
    expect(mismatches, `Severity drift:\n${mismatches.join("\n")}`).toEqual([]);
  });

  it(`every code in DIAGNOSTICS has a row in ${COMPLETE_TABLE}`, () => {
    const documented = new Set(
      rows.filter((row) => row.file === COMPLETE_TABLE).map((row) => row.code),
    );
    const missing = catalogCodes
      .filter((code) => !documented.has(code))
      .map((code) => `${COMPLETE_TABLE} has no row for ${code} (${DIAGNOSTICS[code].severity})`);
    expect(missing, `Undocumented diagnostics:\n${missing.join("\n")}`).toEqual([]);
  });
});
