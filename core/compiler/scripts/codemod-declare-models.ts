/**
 * Codemod: declare in `options.models` every model the setup body creates with `defineModel`.
 *
 * `options.models` is a type-only channel (see `ComponentOptions.models` and ADR-006): it teaches a
 * parent's checker the two-way props a child creates, and nothing downstream reads it. Until every
 * authored component declares its models, turning the declaration into the authoritative surface
 * would make correct code error, so the corpus is migrated first.
 *
 * The transform is mechanical because the compiler already extracts the same facts at P2: read the
 * `defineModel<T>("name")` calls in a setup body, write the matching `{ name: Ctor }` entries into
 * the options object. It edits by splicing text at AST offsets rather than reprinting, so untouched
 * lines stay byte-identical; run `vp fmt` afterwards to wrap anything past the line budget.
 *
 * Idempotent: a `defineComponent` call whose options already carry a `models` key is left alone.
 *
 * Usage:
 *   pnpm --filter @inkline/compiler exec tsx scripts/codemod-declare-models.ts <glob|file> [...]
 *   …add --dry-run to print the plan without writing.
 */
import { readFileSync, writeFileSync } from "node:fs";
import * as ts from "typescript";

/** Inverse of the compiler's `CONSTRUCTOR_TYPES`: the `PropDeclaration` spelling for a model type. */
const CONSTRUCTOR_FOR_TYPE: Readonly<Record<string, string>> = {
  string: "String",
  number: "Number",
  boolean: "Boolean",
  object: "Object",
  array: "Array",
  function: "Function",
};

interface Model {
  readonly name: string;
  /**
   * `Object` whenever `defineModel`'s type argument is something no `PropDeclaration` can spell
   * (a named interface, a union of literals). INK0094 compares types only when both sides are
   * expressible, so this is a declaration, not a claim the checker will contradict.
   */
  readonly constructorName: string;
}

interface Edit {
  readonly pos: number;
  readonly text: string;
}

/** The `defineModel<T>("name")` calls in a setup body, not descending into nested components. */
function collectModels(setup: ts.Node): Model[] {
  const models: Model[] = [];

  const visit = (node: ts.Node): void => {
    if (node !== setup && isDefineComponentCall(node)) return;

    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "defineModel"
    ) {
      const nameArg = node.arguments[0];
      if (nameArg && ts.isStringLiteralLike(nameArg)) {
        const typeText = node.typeArguments?.[0]?.getText();
        models.push({
          name: nameArg.text,
          constructorName: (typeText && CONSTRUCTOR_FOR_TYPE[typeText]) ?? "Object",
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  ts.forEachChild(setup, visit);
  return models;
}

function isDefineComponentCall(node: ts.Node): node is ts.CallExpression {
  return (
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === "defineComponent"
  );
}

function hasModelsKey(options: ts.ObjectLiteralExpression): boolean {
  return options.properties.some(
    (member) =>
      (ts.isPropertyAssignment(member) || ts.isShorthandPropertyAssignment(member)) &&
      ts.isIdentifier(member.name) &&
      member.name.text === "models",
  );
}

/**
 * The edit that adds the `models` key to one `defineComponent` call, or `undefined` when there is
 * nothing to add. `models` goes first: it is authoring surface, where `meta` is compiler metadata.
 */
function planEdit(call: ts.CallExpression): Edit | undefined {
  const setup = call.arguments.at(-1);
  if (!setup || (!ts.isArrowFunction(setup) && !ts.isFunctionExpression(setup))) return undefined;

  const models = collectModels(setup);
  if (models.length === 0) return undefined;

  const entries = models.map((m) => `${m.name}: ${m.constructorName}`).join(", ");
  const options = call.arguments.length > 1 ? call.arguments[0] : undefined;

  // `defineComponent(setup)` — no options object yet, so introduce one.
  if (!options) return { pos: setup.getStart(), text: `{ models: { ${entries} } }, ` };

  if (!ts.isObjectLiteralExpression(options)) {
    throw new Error(
      `options argument is not an object literal (${ts.SyntaxKind[options.kind]}); migrate by hand`,
    );
  }
  if (hasModelsKey(options)) return undefined;

  const first = options.properties[0];
  return first
    ? { pos: first.getStart(), text: `models: { ${entries} }, ` }
    : { pos: options.getStart() + 1, text: ` models: { ${entries} } ` };
}

function migrate(filePath: string): Model[] | undefined {
  const source = readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const edits: Edit[] = [];
  const declared: Model[] = [];

  const visit = (node: ts.Node): void => {
    if (isDefineComponentCall(node)) {
      const edit = planEdit(node);
      if (edit) {
        edits.push(edit);
        declared.push(...collectModels(node.arguments.at(-1)!));
      }
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(sourceFile, visit);

  if (edits.length === 0) return undefined;

  // Back to front, so an earlier splice never shifts a later offset.
  let output = source;
  for (const edit of [...edits].sort((a, b) => b.pos - a.pos)) {
    output = output.slice(0, edit.pos) + edit.text + output.slice(edit.pos);
  }

  if (!process.argv.includes("--dry-run")) writeFileSync(filePath, output, "utf8");
  return declared;
}

const files = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
if (files.length === 0) {
  console.error("usage: codemod-declare-models.ts <file.ink.tsx> [...] [--dry-run]");
  process.exit(1);
}

let changed = 0;
let sites = 0;
for (const file of files) {
  const declared = migrate(file);
  if (!declared) continue;
  changed += 1;
  sites += declared.length;
  console.log(`${file}: ${declared.map((m) => `${m.name}: ${m.constructorName}`).join(", ")}`);
}
console.log(`\n${changed} file(s) changed, ${sites} model(s) declared, ${files.length} scanned.`);
