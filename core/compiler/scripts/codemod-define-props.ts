#!/usr/bin/env node
/**
 * Rewrites the setup parameter's props annotation into a `defineProps<T>()` call (UXF-247, design
 * UXF-241 §6 Phase 3).
 *
 *   node --experimental-strip-types scripts/codemod-define-props.ts <glob-or-file>…
 *   node --experimental-strip-types scripts/codemod-define-props.ts --check <glob-or-file>…
 *
 *     defineComponent(opts, (props: ButtonProps) => { … })
 *   → defineComponent(opts, () => { const props = defineProps<ButtonProps>(); … })
 *
 * The edit is syntactic on purpose. Both channels feed the same `parsePropsFromTypeNode`, so the
 * type argument the macro receives is the annotation's type node verbatim and the checker resolves
 * it from the identical position — nothing here needs to know what `ButtonProps` means.
 *
 * It refuses rather than guesses. Every shape it will not rewrite (a destructured parameter, a
 * non-reference annotation, a concise arrow body, a file that already declares props another way)
 * is reported with a reason and left untouched, so `--check` doubles as the census of what a corpus
 * migration would still cost by hand.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as ts from "typescript";

/** Why a file was left alone. A skip is a measurement, not a failure. */
export type SkipReason =
  | "no-define-component"
  | "no-props-parameter"
  | "destructured-parameter"
  | "unsupported-annotation"
  | "concise-body"
  | "already-macro";

export type CodemodResult =
  | { readonly kind: "converted"; readonly text: string; readonly propsType: string }
  | { readonly kind: "skipped"; readonly reason: SkipReason; readonly detail?: string };

/** One replacement of `[start, end)` with `text`. Applied back-to-front so offsets stay valid. */
interface Edit {
  readonly start: number;
  readonly end: number;
  readonly text: string;
}

const CORE_MODULE = "@inkline/core";

function applyEdits(source: string, edits: readonly Edit[]): string {
  return [...edits]
    .sort((a, b) => b.start - a.start)
    .reduce((text, edit) => text.slice(0, edit.start) + edit.text + text.slice(edit.end), source);
}

/** The `import … from "@inkline/core"` named-import clause, when the file has one. */
function findCoreImport(sourceFile: ts.SourceFile): ts.NamedImports | undefined {
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    if (!ts.isStringLiteral(statement.moduleSpecifier)) continue;
    if (statement.moduleSpecifier.text !== CORE_MODULE) continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) return bindings;
  }
  return undefined;
}

/**
 * The setup arrow of a top-level `export default defineComponent(…)`, with the call's own name so
 * an aliased import is still found. Only the default export is considered: a `defineComponent` in a
 * nested position is not the component this file declares.
 */
function findSetupArrow(
  sourceFile: ts.SourceFile,
  defineComponentLocal: string,
): ts.ArrowFunction | undefined {
  for (const statement of sourceFile.statements) {
    if (!ts.isExportAssignment(statement)) continue;
    const call = statement.expression;
    if (!ts.isCallExpression(call)) continue;
    if (!ts.isIdentifier(call.expression) || call.expression.text !== defineComponentLocal)
      continue;
    const last = call.arguments.at(-1);
    if (last && ts.isArrowFunction(last)) return last;
  }
  return undefined;
}

/** The indentation of the line `pos` sits on, so the inserted statement lines up with the body. */
function lineIndent(sourceFile: ts.SourceFile, pos: number): string {
  const lineStart = sourceFile.getLineStarts()[sourceFile.getLineAndCharacterOfPosition(pos).line]!;
  return /^[ \t]*/.exec(sourceFile.text.slice(lineStart, pos))![0];
}

/**
 * Where the declaration is inserted: before `node`, and before any comment attached to it.
 *
 * `getStart` skips leading trivia, which would slide the new statement between a comment and the
 * statement the comment documents.
 */
function insertionPoint(sourceFile: ts.SourceFile, node: ts.Node): number {
  const comments = ts.getLeadingCommentRanges(sourceFile.text, node.getFullStart());
  return comments?.[0]?.pos ?? node.getStart(sourceFile);
}

export function codemodSource(fileName: string, source: string): CodemodResult {
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const coreImport = findCoreImport(sourceFile);
  if (!coreImport) return { kind: "skipped", reason: "no-define-component" };

  const specifiers = coreImport.elements;
  const defineComponentSpecifier = specifiers.find(
    (element) => (element.propertyName ?? element.name).text === "defineComponent",
  );
  if (!defineComponentSpecifier) return { kind: "skipped", reason: "no-define-component" };
  if (specifiers.some((element) => (element.propertyName ?? element.name).text === "defineProps")) {
    return { kind: "skipped", reason: "already-macro" };
  }

  const arrow = findSetupArrow(sourceFile, defineComponentSpecifier.name.text);
  if (!arrow) return { kind: "skipped", reason: "no-define-component" };

  const parameter = arrow.parameters[0];
  if (!parameter || arrow.parameters.length !== 1 || !parameter.type) {
    return { kind: "skipped", reason: "no-props-parameter" };
  }
  if (!ts.isIdentifier(parameter.name)) {
    // `requirePropsNotDestructured` applies to the macro's result too, so a destructured parameter
    // has no correct macro form to rewrite into. It is a props bug either way — report it.
    return { kind: "skipped", reason: "destructured-parameter" };
  }
  if (!ts.isTypeReferenceNode(parameter.type) && !ts.isTypeLiteralNode(parameter.type)) {
    return {
      kind: "skipped",
      reason: "unsupported-annotation",
      detail: parameter.type.getText(sourceFile),
    };
  }
  if (!ts.isBlock(arrow.body)) return { kind: "skipped", reason: "concise-body" };

  const propsName = parameter.name.text;
  const propsType = parameter.type.getText(sourceFile);
  const firstStatement = arrow.body.statements[0];
  // An empty body still needs a home for the declaration; the closing brace's line indents it.
  const anchor = insertionPoint(sourceFile, firstStatement ?? arrow.body.getLastToken(sourceFile)!);
  const indent = lineIndent(sourceFile, anchor);

  const edits: Edit[] = [
    // `defineProps` sits next to `defineComponent` rather than at the end: the corpus orders this
    // import by role, not alphabetically.
    {
      start: defineComponentSpecifier.end,
      end: defineComponentSpecifier.end,
      text: ", defineProps",
    },
    { start: parameter.getStart(sourceFile), end: parameter.end, text: "" },
    {
      start: anchor,
      end: anchor,
      text: `const ${propsName} = defineProps<${propsType}>();\n\n${indent}`,
    },
  ];

  return { kind: "converted", text: applyEdits(source, edits), propsType };
}

function main(argv: readonly string[]): number {
  const check = argv.includes("--check");
  const files = argv.filter((arg) => !arg.startsWith("--"));

  if (files.length === 0) {
    console.error("usage: codemod-define-props.ts [--check] <file>…");
    return 2;
  }

  let converted = 0;
  for (const file of files) {
    const source = readFileSync(file, "utf-8");
    const result = codemodSource(file, source);

    if (result.kind === "skipped") {
      console.log(
        `skip     ${file}  (${result.reason}${result.detail ? `: ${result.detail}` : ""})`,
      );
      continue;
    }

    converted += 1;
    console.log(`convert  ${file}  (${result.propsType})`);
    if (!check) writeFileSync(file, result.text, "utf-8");
  }

  console.log(
    `\n${converted}/${files.length} converted${check ? " (--check: nothing written)" : ""}`,
  );
  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  process.exitCode = main(process.argv.slice(2));
}
