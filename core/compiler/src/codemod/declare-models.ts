import * as ts from "typescript";

/**
 * Inverse of the parser's `CONSTRUCTOR_TYPES`: the `PropDeclaration` spelling for a model type.
 * A type no entry can spell — a named interface, a union of literals — has no row here and lands on
 * `Object`, which INK0094 treats as expressible-agreement rather than drift.
 */
const CONSTRUCTOR_FOR_TYPE: Readonly<Record<string, string>> = {
  string: "String",
  number: "Number",
  boolean: "Boolean",
  object: "Object",
  array: "Array",
  function: "Function",
};

/** The constructor spellings this writer emits, and so the only ones it recognises as its own. */
const WRITTEN_CONSTRUCTORS: ReadonlySet<string> = new Set(Object.values(CONSTRUCTOR_FOR_TYPE));

/** One `models` entry, as the writer spells it. */
export interface DeclaredModel {
  readonly name: string;
  readonly constructorName: string;
}

/** What the fix did to one entry, for reporting. `to`/`from` are constructor spellings. */
export type ModelEdit =
  | { readonly kind: "add"; readonly name: string; readonly to: string }
  | { readonly kind: "update"; readonly name: string; readonly from: string; readonly to: string }
  | { readonly kind: "remove"; readonly name: string };

export interface DeclareModelsResult {
  /** The rewritten source. Identical to the input when `edits` is empty. */
  readonly output: string;
  /** Empty when every `defineComponent` already declares exactly what its setup body creates. */
  readonly edits: readonly ModelEdit[];
}

interface Splice {
  readonly start: number;
  readonly end: number;
  readonly text: string;
}

/**
 * Rewrite every `defineComponent` call's `options.models` to match the `defineModel` calls in its
 * setup body — adding the key, correcting stale entries, and dropping the key when the setup body
 * creates no models at all.
 *
 * `options.models` is a type-only channel (ADR-006, ADR-008): it teaches a parent's checker the
 * two-way props a child creates, and nothing downstream reads it. That makes it machine-owned
 * output — the author writes `defineModel<T>("name")` and this writes the entry, the same facts the
 * compiler already extracts at P2. INK0094 is the diagnostic that says the file needs this run.
 *
 * Edits are text splices at AST offsets rather than a reprint, so untouched lines stay
 * byte-identical. Entries are compared by name and constructor, never by their text, so a `models`
 * block the formatter has since wrapped is still recognised as agreeing — running the fix after
 * `vp fmt`, or twice in a row, changes nothing.
 */
export function declareModels(fileName: string, source: string): DeclareModelsResult {
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const splices: Splice[] = [];
  const edits: ModelEdit[] = [];

  const visit = (node: ts.Node): void => {
    if (isDefineComponentCall(node)) planCall(node, splices, edits);
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(sourceFile, visit);

  // Back to front, so an earlier splice never shifts a later offset.
  let output = source;
  for (const splice of [...splices].sort((a, b) => b.start - a.start)) {
    output = output.slice(0, splice.start) + splice.text + output.slice(splice.end);
  }

  return { output, edits };
}

function planCall(call: ts.CallExpression, splices: Splice[], edits: ModelEdit[]): void {
  const setup = call.arguments.at(-1);
  if (!setup || (!ts.isArrowFunction(setup) && !ts.isFunctionExpression(setup))) return;

  const actual = collectModels(setup);
  const options = call.arguments.length > 1 ? call.arguments[0] : undefined;

  // `defineComponent(setup)` — no options object yet.
  if (!options) {
    if (actual.length === 0) return;
    splices.push({
      start: setup.getStart(),
      end: setup.getStart(),
      text: `{ models: ${print(actual)} }, `,
    });
    edits.push(
      ...actual.map((m): ModelEdit => ({ kind: "add", name: m.name, to: m.constructorName })),
    );
    return;
  }

  if (!ts.isObjectLiteralExpression(options)) {
    throw new Error(
      `${call.getSourceFile().fileName}: options argument is not an object literal ` +
        `(${ts.SyntaxKind[options.kind]}); declare its models by hand`,
    );
  }

  const declaredProp = findModelsProperty(options);

  if (!declaredProp) {
    if (actual.length === 0) return;
    const first = options.properties[0];
    // `models` goes first: it is authoring surface, where `meta` is compiler metadata.
    const insertAt = first ? first.getStart() : options.getStart() + 1;
    splices.push({
      start: insertAt,
      end: insertAt,
      text: first ? `models: ${print(actual)}, ` : ` models: ${print(actual)} `,
    });
    edits.push(
      ...actual.map((m): ModelEdit => ({ kind: "add", name: m.name, to: m.constructorName })),
    );
    return;
  }

  const declared = readDeclared(declaredProp.initializer);
  const diff = diffModels(declared, actual);
  if (diff.length === 0) return;
  edits.push(...diff);

  if (actual.length === 0) {
    splices.push(removalSplice(options, declaredProp, setup));
    return;
  }

  splices.push({
    start: declaredProp.initializer.getStart(),
    end: declaredProp.initializer.getEnd(),
    text: print(actual),
  });
}

/** The `defineModel<T>("name")` calls in a setup body, not descending into nested components. */
function collectModels(setup: ts.Node): DeclaredModel[] {
  const models: DeclaredModel[] = [];

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

function findModelsProperty(
  options: ts.ObjectLiteralExpression,
): ts.PropertyAssignment | undefined {
  return options.properties.find(
    (member): member is ts.PropertyAssignment =>
      ts.isPropertyAssignment(member) &&
      ts.isIdentifier(member.name) &&
      member.name.text === "models",
  );
}

/**
 * The entries currently written, keyed by name. A value this writer would never emit — a full
 * `{ type: … }` shape, a bare default, anything non-constructor — reads as `"?"`, which no computed
 * constructor equals, so the entry is rewritten into canonical form rather than silently kept.
 */
function readDeclared(value: ts.Expression): Map<string, string> {
  const declared = new Map<string, string>();
  if (!ts.isObjectLiteralExpression(value)) return declared;

  for (const member of value.properties) {
    if (!ts.isPropertyAssignment(member) || !ts.isIdentifier(member.name)) continue;
    const init = member.initializer;
    const spelling = ts.isIdentifier(init) && WRITTEN_CONSTRUCTORS.has(init.text) ? init.text : "?";
    declared.set(member.name.text, spelling);
  }

  return declared;
}

/** Order is not meaning here, so a reordered block is not a change — only names and types are. */
function diffModels(declared: Map<string, string>, actual: readonly DeclaredModel[]): ModelEdit[] {
  const edits: ModelEdit[] = [];

  for (const model of actual) {
    const from = declared.get(model.name);
    if (from === undefined) {
      edits.push({ kind: "add", name: model.name, to: model.constructorName });
    } else if (from !== model.constructorName) {
      edits.push({ kind: "update", name: model.name, from, to: model.constructorName });
    }
  }

  const actualNames = new Set(actual.map((m) => m.name));
  for (const name of declared.keys()) {
    if (!actualNames.has(name)) edits.push({ kind: "remove", name });
  }

  return edits;
}

/**
 * Cut the `models` key out. When it was the options object's only key the whole argument goes with
 * it, so a component that loses its last model returns to the `defineComponent(setup)` form it
 * would have been written in — the transform round-trips instead of leaving `{}` behind.
 */
function removalSplice(
  options: ts.ObjectLiteralExpression,
  prop: ts.PropertyAssignment,
  setup: ts.Expression,
): Splice {
  if (options.properties.length === 1) {
    return { start: options.getStart(), end: setup.getStart(), text: "" };
  }

  const index = options.properties.indexOf(prop);
  const next = options.properties[index + 1];
  // Take the following separator with it, or — when it is last — the preceding one.
  if (next) return { start: prop.getStart(), end: next.getStart(), text: "" };
  return { start: options.properties[index - 1]!.getEnd(), end: prop.getEnd(), text: "" };
}

function print(models: readonly DeclaredModel[]): string {
  return `{ ${models.map((m) => `${m.name}: ${m.constructorName}`).join(", ")} }`;
}
