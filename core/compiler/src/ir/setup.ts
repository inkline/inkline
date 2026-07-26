import * as ts from "typescript";

/**
 * Setup-body local declarations — the handlers and helpers an author writes above the render return
 * (`const onToggle = () => …`, `function onNavigate() { … }`). Parse captures them into
 * `IRComponent.setup`; codegen emits a definition per target and the analyze pass diagnoses the
 * ones it cannot emit (INK0121). These helpers are the single source of truth for *which* names a
 * setup statement declares and *whether* a definition can be emitted, shared by both phases so they
 * never disagree.
 */

/** The identifier names a setup statement declares (const/let/var declarators, or a function name). */
export function setupDeclaredNames(stmt: ts.Statement): string[] {
  if (ts.isFunctionDeclaration(stmt)) return stmt.name ? [stmt.name.text] : [];
  if (ts.isVariableStatement(stmt)) {
    const names: string[] = [];
    for (const d of stmt.declarationList.declarations) {
      if (ts.isIdentifier(d.name)) names.push(d.name.text);
    }
    return names;
  }
  return [];
}

export interface SetupLocalDef {
  readonly name: string;
  /** The arrow or function expression whose (rewritten) text becomes the emitted definition. */
  readonly initializer: ts.Expression;
}

/**
 * The `(name, initializer)` pairs codegen emits for a setup statement. Emittable forms are a
 * function declaration and a `const`/`let` declarator initialized by an arrow or function
 * expression. A function declaration is wrapped as a named function expression so one expression
 * rewriter serves every target — `const f = function f(…) {…}` on the six standalone targets, a
 * `f = function f(…) {…}` class field on Angular. A declarator that is not function-valued yields no
 * entry (it is a drop → INK0121 if referenced).
 */
export function setupLocalDefs(stmt: ts.Statement): SetupLocalDef[] {
  if (ts.isFunctionDeclaration(stmt) && stmt.name && stmt.body) {
    const asyncMod = stmt.modifiers?.find((m) => m.kind === ts.SyntaxKind.AsyncKeyword) as
      | ts.Modifier
      | undefined;
    const fnExpr = ts.factory.createFunctionExpression(
      asyncMod ? [asyncMod] : undefined,
      stmt.asteriskToken,
      stmt.name,
      stmt.typeParameters,
      stmt.parameters,
      stmt.type,
      stmt.body,
    );
    return [{ name: stmt.name.text, initializer: fnExpr }];
  }
  if (ts.isVariableStatement(stmt)) {
    const defs: SetupLocalDef[] = [];
    for (const d of stmt.declarationList.declarations) {
      if (
        ts.isIdentifier(d.name) &&
        d.initializer &&
        (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer))
      ) {
        defs.push({ name: d.name.text, initializer: d.initializer });
      }
    }
    return defs;
  }
  return [];
}

/** The subset of {@link setupDeclaredNames} that codegen emits a definition for. */
export function emittedSetupNames(stmt: ts.Statement): string[] {
  return setupLocalDefs(stmt).map((d) => d.name);
}
