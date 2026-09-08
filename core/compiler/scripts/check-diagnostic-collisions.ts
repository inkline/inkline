#!/usr/bin/env node
/**
 * Fails a branch that introduces a diagnostic code `origin/main` already defines.
 *
 *   node --experimental-strip-types scripts/check-diagnostic-collisions.ts
 *
 * Codes are claimed when a branch is authored and merged in whatever order review finishes, so two
 * branches opened in the same window both take the next free number. Nothing inside either branch
 * can see the other: `codes.test.ts` and `docs-tables.test.ts` compare the catalog to files in the
 * same working tree. #617 was renumbered twice this way (INK0075 → INK0076 → INK0077), each
 * renumber touching ~11 files after review had already passed.
 *
 * Three revisions answer two different questions, and confusing them is how this check would go
 * blind:
 *
 *   - *What does this branch introduce?* — `HEAD` against the merge base. Only the branch's own
 *     history distinguishes a newly claimed code from an edit to one that already existed, so a
 *     severity change or a reworded title cannot be mistaken for a claim.
 *   - *What is already taken?* — the `origin/main` **tip**, never the merge base. The merge base is
 *     by definition stale on the branches this check exists for; asking it whether INK0077 is free
 *     returns "yes" for precisely the branch that is about to collide.
 *
 * Only a key of the `DIAGNOSTICS` object literal counts as a claim, read off the AST. A code named
 * anywhere else — a `push("INK0075")` call site, a docs table row, the `url` value, a comment — is
 * a reference to a code someone else owns, not a claim on it, and cannot trip this check.
 */

import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as ts from "typescript";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

/** Repository root, so `git show <rev>:<path>` resolves the same way from any working directory. */
export const REPO_ROOT = resolve(SCRIPT_DIR, "../../..");

/** Repo-relative, because `git show` addresses blobs from the repository root. */
export const CATALOG_PATH = "core/compiler/src/core/diagnostics/codes.ts";

export const MAIN_REF = "origin/main";

const CODE_KEY = /^INK\d{4}$/;

export interface CatalogEntry {
  readonly severity: string;
  readonly title: string;
}

export type Catalog = ReadonlyMap<string, CatalogEntry>;

export interface Collision {
  readonly code: string;
  /** The rule this branch tried to give the code. */
  readonly branchTitle: string;
  /** The rule on `origin/main` that already holds it. */
  readonly mainTitle: string;
  readonly mainSeverity: string;
  /** Lowest code at or above `code` that is free on both sides — the renumber target. */
  readonly suggestion: string;
}

/** `"error" as const` and a prettier-wrapped title are both string literals behind an assertion. */
function stringValue(node: ts.Expression | undefined): string | undefined {
  if (!node) return undefined;
  if (ts.isAsExpression(node) || ts.isParenthesizedExpression(node))
    return stringValue(node.expression);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  return undefined;
}

/**
 * The keys of the `DIAGNOSTICS` object literal, with the severity and title that identify the rule
 * behind each one. Read from the AST rather than by scanning for `INKxxxx`, so only a property name
 * counts — the same reason `gen-aria-attributes.ts` reads property names instead of `aria-` strings.
 */
export function extractCatalog(source: string, fileName = CATALOG_PATH): Map<string, CatalogEntry> {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true);
  const entries = new Map<string, CatalogEntry>();

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== "DIAGNOSTICS") continue;

      let initializer = declaration.initializer;
      while (
        initializer &&
        (ts.isAsExpression(initializer) || ts.isParenthesizedExpression(initializer))
      ) {
        initializer = initializer.expression;
      }
      if (!initializer || !ts.isObjectLiteralExpression(initializer)) continue;

      for (const property of initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const name =
          ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
            ? property.name.text
            : undefined;
        if (!name || !CODE_KEY.test(name)) continue;
        if (!ts.isObjectLiteralExpression(property.initializer)) continue;

        let severity = "";
        let title = "";
        for (const field of property.initializer.properties) {
          if (!ts.isPropertyAssignment(field) || !ts.isIdentifier(field.name)) continue;
          const value = stringValue(field.initializer);
          if (value === undefined) continue;
          if (field.name.text === "severity") severity = value;
          if (field.name.text === "title") title = value;
        }
        entries.set(name, { severity, title });
      }
    }
  }

  return entries;
}

/** Lowest `INKxxxx` at or above `code` that neither side defines. */
export function suggestFreeCode(code: string, taken: Iterable<string>): string {
  const used = new Set(taken);
  for (let n = Number(code.slice(3)); n <= 9999; n += 1) {
    const candidate = `INK${String(n).padStart(4, "0")}`;
    if (!used.has(candidate)) return candidate;
  }
  return code;
}

/**
 * Every code this branch introduces that `origin/main` has since claimed for a different rule.
 *
 * `base` is the merge base and answers only "did this branch add this key". An entry `main` already
 * holds identically is not a collision: after a squash merge the branch keeps a merge base from
 * before the merge, so its own already-merged code would otherwise be reported against itself.
 */
export function findCollisions(base: Catalog, head: Catalog, main: Catalog): Collision[] {
  const collisions: Collision[] = [];
  const taken = new Set([...main.keys(), ...head.keys()]);

  for (const [code, branch] of head) {
    if (base.has(code)) continue;
    const claimed = main.get(code);
    if (!claimed) continue;
    if (claimed.title === branch.title && claimed.severity === branch.severity) continue;
    collisions.push({
      code,
      branchTitle: branch.title,
      mainTitle: claimed.title,
      mainSeverity: claimed.severity,
      suggestion: suggestFreeCode(code, taken),
    });
  }

  return collisions;
}

export function formatCollisions(collisions: readonly Collision[]): string[] {
  return collisions.map(
    (collision) =>
      `${collision.code} is already defined on ${MAIN_REF}.\n` +
      `    ${MAIN_REF}: "${collision.mainTitle}" (${collision.mainSeverity})\n` +
      `    this branch: "${collision.branchTitle}"\n` +
      `    Renumber this branch to ${collision.suggestion} — the catalog entry and every ` +
      `reference to it — then re-run.`,
  );
}

function git(args: readonly string[], cwd: string): string {
  return execFileSync("git", [...args], { cwd, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
}

function blobExists(rev: string, cwd: string): boolean {
  try {
    git(["cat-file", "-e", `${rev}:${CATALOG_PATH}`], cwd);
    return true;
  } catch {
    return false;
  }
}

/**
 * The catalog as of `rev`. A revision that predates the file yields an empty catalog, which is the
 * right answer for the merge base and for `origin/main`; `HEAD` is handled by the caller, because
 * an empty catalog there would make the whole check pass on nothing.
 */
export function catalogAt(rev: string, cwd = REPO_ROOT): Map<string, CatalogEntry> {
  git(["rev-parse", "--verify", `${rev}^{commit}`], cwd);
  if (!blobExists(rev, cwd)) return new Map();
  return extractCatalog(git(["show", `${rev}:${CATALOG_PATH}`], cwd), `${rev}:${CATALOG_PATH}`);
}

export function check(head = "HEAD", mainRef = MAIN_REF, cwd = REPO_ROOT): string[] {
  if (!blobExists(head, cwd)) {
    throw new Error(
      `${CATALOG_PATH} does not exist at ${head} — this check cannot pass vacuously.`,
    );
  }
  const base = git(["merge-base", mainRef, head], cwd).trim();
  return formatCollisions(
    findCollisions(catalogAt(base, cwd), catalogAt(head, cwd), catalogAt(mainRef, cwd)),
  );
}

/** Both revisions are overridable so a historical collision can be replayed against real commits. */
function main(argv: readonly string[]): number {
  const head = argv[0] ?? "HEAD";
  const mainRef = argv[1] ?? MAIN_REF;
  const problems = check(head, mainRef);
  for (const problem of problems) console.error(`error: ${problem}`);
  if (problems.length > 0) return 1;

  console.log(`No diagnostic code on ${head} collides with ${mainRef}.`);
  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  process.exitCode = main(process.argv.slice(2));
}
