import * as ts from "typescript";
import type { RewriteRules } from "../context.ts";
import type { IRComponent } from "../../ir/render/nodes.ts";

export function rewriteExpr(expr: ts.Expression, rules: RewriteRules): string {
  return walk(expr, rules);
}

/**
 * The identifiers that, read as a zero-arg call `foo()`, are reactive accessor reads: signal and
 * model getters (`createSignal`/`defineModel`) and memos (`createMemo`). Spread into a target's
 * {@link RewriteRules.reactiveReads} so the rewriter applies its reactive-read convention to these
 * and emits every other zero-arg call (e.g. an imported recipe) as a plain function call.
 */
export function reactiveReadNames(component: IRComponent): Set<string> {
  return new Set([
    ...component.state.map((s) => s.name),
    ...component.memos.map((m) => m.name),
    ...component.models.map((m) => m.name),
  ]);
}

/** Derive a callback-prop name from an event name: `change` → `onChange`, `update:value` → `onUpdateValue`. */
export function eventToCallbackProp(name: string): string {
  return `on${name
    .split(":")
    .map((s) => (s ? s[0]!.toUpperCase() + s.slice(1) : s))
    .join("")}`;
}

interface ModelLike {
  readonly name: string;
  readonly setterName: string;
  readonly propName: string;
}

/**
 * Build the model/emit rewrite rules for a callback-prop target (React/Solid/Qwik): a model getter
 * reads `props.<prop>`, a model setter and `emit(name, …)` both call a `props.on<Name>[$]?.(…)`
 * callback. `suffix` is `"$"` for Qwik QRLs, `""` otherwise.
 */
export function callbackPropRules(
  models: readonly ModelLike[],
  emitName: string | undefined,
  suffix = "",
): Pick<RewriteRules, "modelReads" | "modelSetters" | "emit"> {
  return {
    modelReads: new Map(models.map((m) => [m.name, `props.${m.propName}`])),
    modelSetters: new Map(
      models.map((m) => [m.setterName, `${eventToCallbackProp(`update:${m.propName}`)}${suffix}`]),
    ),
    emit: emitName ? { local: emitName, style: "callback-prop", suffix } : undefined,
  };
}

const tsPrinter = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const emptySF = ts.createSourceFile("_gen.tsx", "", ts.ScriptTarget.ESNext);

function verbatim(node: ts.Node): string {
  const sf = node.getSourceFile?.();
  if (sf) return node.getText(sf);
  return tsPrinter.printNode(ts.EmitHint.Unspecified, node, emptySF);
}

function hasAsyncModifier(node: ts.ArrowFunction | ts.FunctionExpression): boolean {
  return node.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword) ?? false;
}

/** If `body` is a `batch(() => …)` call, return the inner function so the wrapper can be dropped. */
function unwrapBatchArrowBody(
  body: ts.ConciseBody,
): ts.ArrowFunction | ts.FunctionExpression | undefined {
  if (ts.isBlock(body)) return undefined;
  if (
    ts.isCallExpression(body) &&
    ts.isIdentifier(body.expression) &&
    body.expression.text === "batch" &&
    body.arguments.length === 1 &&
    (ts.isArrowFunction(body.arguments[0]!) || ts.isFunctionExpression(body.arguments[0]!))
  ) {
    return body.arguments[0] as ts.ArrowFunction | ts.FunctionExpression;
  }
  return undefined;
}

function walk(expr: ts.Expression, rules: RewriteRules): string {
  if (ts.isIdentifier(expr)) {
    const renamed = rules.rename?.[expr.text];
    if (renamed !== undefined) return renamed;
    // A bare reactive-value read (e.g. a resource `data`/`loading`) follows the target's reactive
    // read convention even though the authored read has no call syntax.
    if (rules.reactiveBindings?.has(expr.text)) {
      const self = rules.selfPrefix ? "this." : "";
      switch (rules.reactiveRead.kind) {
        case "strip-call":
          return `${self}${expr.text}`;
        case "preserve-call":
          return `${self}${expr.text}()`;
        case "field-access":
          return `${self}${expr.text}.${rules.reactiveRead.field}`;
      }
    }
    // A model getter read bare (no call) resolves to its bound prop on callback-prop targets.
    const bareModelRead = rules.modelReads?.get(expr.text);
    if (bareModelRead !== undefined) return bareModelRead;
    // A bare `props` reference in a target that destructures props (no `props` binding) is
    // rewritten to the reconstruction of its destructured bindings.
    if (expr.text === "props" && rules.members?.props?.whole !== undefined) {
      return rules.members.props.whole;
    }
  }

  if (ts.isCallExpression(expr)) {
    const callee = expr.expression;
    // `batch(() => { … })` is a no-op grouping wrapper in the authoring model (`batch(fn) => fn()`),
    // and every target framework already batches synchronous updates, so unwrap it to the inner
    // body. A block body becomes a `;`-separated statement run (valid in an Angular event binding);
    // an arrow body that is itself a `batch(...)` is collapsed at the arrow handler below.
    if (
      ts.isIdentifier(callee) &&
      callee.text === "batch" &&
      expr.arguments.length === 1 &&
      (ts.isArrowFunction(expr.arguments[0]!) || ts.isFunctionExpression(expr.arguments[0]!))
    ) {
      const fn = expr.arguments[0] as ts.ArrowFunction | ts.FunctionExpression;
      if (ts.isBlock(fn.body)) {
        return fn.body.statements.map((s) => walkStatement(s, rules)).join(" ");
      }
      return walk(fn.body, rules);
    }
    // `hasSlot("name")` → the target's slot-presence check (e.g. `props.renderName != null`,
    // `!!$slots.name`, or `true` where slot presence isn't observable). A missing or non-literal
    // argument names the default slot.
    if (rules.hasSlotCheck && ts.isIdentifier(callee) && callee.text === "hasSlot") {
      const nameArg = expr.arguments[0];
      const slotName = nameArg && ts.isStringLiteral(nameArg) ? nameArg.text : "default";
      return rules.hasSlotCheck(slotName);
    }
    // `emit("name", …args)` → the target's event channel (callback prop / @Output / no-op).
    if (rules.emit && ts.isIdentifier(callee) && callee.text === rules.emit.local) {
      const nameArg = expr.arguments[0];
      const eventName = nameArg && ts.isStringLiteral(nameArg) ? nameArg.text : "";
      const payload = expr.arguments
        .slice(1)
        .map((a) => walk(a, rules))
        .join(", ");
      switch (rules.emit.style) {
        case "noop":
          return "undefined";
        case "angular-output":
          return `${rules.selfPrefix ? "this." : ""}${eventName}.emit(${payload})`;
        case "callback-prop": {
          const access = rules.emit.propsAccess ?? "props.";
          return `${access}${eventToCallbackProp(eventName)}${rules.emit.suffix ?? ""}?.(${payload})`;
        }
      }
    }
    // A model setter on a callback-prop target: `setValue(v)` → `props.onUpdateValue?.(v)`.
    const modelCallback = ts.isIdentifier(callee)
      ? rules.modelSetters?.get(callee.text)
      : undefined;
    if (modelCallback !== undefined) {
      const value = expr.arguments.map((a) => walk(a, rules)).join(", ");
      return `props.${modelCallback}?.(${value})`;
    }
    // A call to a known state setter: `setX(v)` → target-specific mutation.
    const setterName = ts.isIdentifier(callee) ? callee.text : undefined;
    const setterState = setterName !== undefined ? rules.setters?.[setterName] : undefined;
    if (setterName !== undefined && setterState !== undefined) {
      const self = rules.selfPrefix ? "this." : "";
      const value = expr.arguments.map((a) => walk(a, rules)).join(", ");
      // A setter for a context-lifted signal writes through the provided getter/setter.
      const providedSetter = rules.providedSignals?.get(setterState);
      if (providedSetter) {
        return `${self}${providedSetter.field}.${providedSetter.prop} = ${value}`;
      }
      switch (rules.setterStyle.kind) {
        case "function-call":
          return `${self}${setterName}(${value})`;
        case "field-assignment":
          return `${self}${setterState}.${rules.setterStyle.field} = ${value}`;
        case "direct-assignment":
          return `${self}${setterState} = ${value}`;
        case "method-call":
          return `${self}${setterState}.${rules.setterStyle.method}(${value})`;
      }
    }
    if (ts.isIdentifier(callee) && expr.arguments.length === 0) {
      // A model getter read `value()` resolves to its bound prop on callback-prop targets.
      const modelRead = rules.modelReads?.get(callee.text);
      if (modelRead !== undefined) return modelRead;
      const self = rules.selfPrefix ? "this." : "";
      // A read of a context-lifted signal goes through the provided getter.
      const providedRead = rules.providedSignals?.get(callee.text);
      if (providedRead) {
        return `${self}${providedRead.field}.${providedRead.prop}`;
      }
      // Only a known reactive accessor (signal/memo/model getter) follows the target's reactive-read
      // convention; in class-body contexts it is a member access. Any other zero-arg call — e.g. an
      // imported styleframe recipe `inputAppendRecipe()` — is a real function call and falls through
      // to the generic call emission below, keeping its `()`.
      if (rules.reactiveReads?.has(callee.text)) {
        switch (rules.reactiveRead.kind) {
          case "strip-call":
            return `${self}${callee.text}`;
          case "preserve-call":
            return `${self}${callee.text}()`;
          case "field-access":
            return `${self}${callee.text}.${rules.reactiveRead.field}`;
        }
      }
    }
    const args = expr.arguments.map((a) => walk(a, rules));
    const open = expr.questionDotToken ? "?.(" : "(";
    return `${walk(callee, rules)}${open}${args.join(", ")})`;
  }

  if (ts.isBinaryExpression(expr)) {
    return `${walk(expr.left, rules)} ${expr.operatorToken.getText()} ${walk(expr.right, rules)}`;
  }

  if (ts.isConditionalExpression(expr)) {
    return `${walk(expr.condition, rules)} ? ${walk(expr.whenTrue, rules)} : ${walk(expr.whenFalse, rules)}`;
  }

  if (ts.isPropertyAccessExpression(expr)) {
    if (ts.isIdentifier(expr.expression)) {
      if (expr.expression.text === "props") {
        // Angular collapse: a headless child's root reads its OWN props; substitute each with the
        // expression the styled wrapper passed for it, so the inlined host binds against the styled's
        // real arguments instead of its same-named props. `null`/absent (the wrapper forwarded
        // nothing) becomes `undefined` so it stays safe inside a larger expression (`x ?? 'y'`).
        if (rules.collapse?.propArgs) {
          const arg = rules.collapse.propArgs.get(expr.name.text);
          return arg == null ? "undefined" : arg;
        }
        // Angular signal inputs are read in call form (`this.color()` / `color()`).
        const call = rules.propSignals ? "()" : "";
        if (rules.selfPrefix) return `this.${expr.name.text}${call}`;
        if (rules.members?.props?.strip) return `${expr.name.text}${call}`;
        // A prop destructured into a local with a default (React) reads as the bare local so the
        // default takes effect; otherwise `props.x` stays verbatim.
        if (rules.propLocals?.has(expr.name.text)) return expr.name.text;
      }
      if (expr.expression.text === "slots" && rules.members?.slots?.strip) {
        return rules.members.slots.rename?.[expr.name.text] ?? expr.name.text;
      }
    }
    if (expr.name.text === "current") {
      const base = walk(expr.expression, rules);
      switch (rules.refAccess.kind) {
        case "bare": {
          // In the template a ref stays the bare template-ref variable (already the DOM node).
          if (!rules.selfPrefix) return base;
          // In a class body (Angular) a ref is a `viewChild` signal member, so `inputRef.current`
          // becomes `this.inputRef()`. For an *element* ref that call returns an `ElementRef`
          // wrapper, so unwrap to `this.inputRef()?.nativeElement` to reach the real DOM node;
          // component refs (not in `elementRefs`) keep the raw signal read.
          const read = `this.${base}()`;
          return rules.refAccess.unwrap && rules.elementRefs?.has(base)
            ? `${read}?.${rules.refAccess.unwrap}`
            : read;
        }
        case "field":
          return `${base}${expr.questionDotToken ? "?." : "."}${rules.refAccess.field}`;
      }
    }
    const dot = expr.questionDotToken ? "?." : ".";
    return `${walk(expr.expression, rules)}${dot}${expr.name.text}`;
  }

  if (ts.isElementAccessExpression(expr)) {
    const bracket = expr.questionDotToken ? "?.[" : "[";
    return `${walk(expr.expression, rules)}${bracket}${walk(expr.argumentExpression, rules)}]`;
  }

  if (ts.isArrowFunction(expr)) {
    const asyncKw = hasAsyncModifier(expr) ? "async " : "";
    const params = expr.parameters.map((p) => verbatim(p)).join(", ");
    const paramStr =
      expr.parameters.length === 1 && !expr.parameters[0]!.type ? params : `(${params})`;
    // `() => batch(() => { … })` collapses to `() => { … }` (batch is a no-op grouping wrapper),
    // keeping the handler an arrow with a block body rather than a stray statement run.
    const unwrappedBatch = unwrapBatchArrowBody(expr.body);
    if (unwrappedBatch) {
      const inner = ts.isBlock(unwrappedBatch.body)
        ? walkBlock(unwrappedBatch.body, rules)
        : walk(unwrappedBatch.body, rules);
      return `${asyncKw}${paramStr} => ${inner}`;
    }
    if (ts.isBlock(expr.body)) return `${asyncKw}${paramStr} => ${walkBlock(expr.body, rules)}`;
    return `${asyncKw}${paramStr} => ${walk(expr.body, rules)}`;
  }

  if (ts.isFunctionExpression(expr)) {
    const asyncKw = hasAsyncModifier(expr) ? "async " : "";
    const params = expr.parameters.map((p) => verbatim(p)).join(", ");
    const name = expr.name ? ` ${expr.name.text}` : "";
    return `${asyncKw}function${name}(${params}) ${walkBlock(expr.body, rules)}`;
  }

  if (ts.isParenthesizedExpression(expr)) return `(${walk(expr.expression, rules)})`;

  if (ts.isPrefixUnaryExpression(expr))
    return `${ts.tokenToString(expr.operator)}${walk(expr.operand, rules)}`;

  if (ts.isPostfixUnaryExpression(expr))
    return `${walk(expr.operand, rules)}${ts.tokenToString(expr.operator)}`;

  if (ts.isTemplateExpression(expr)) {
    let out = "`" + expr.head.text;
    for (const span of expr.templateSpans) {
      out += "${" + walk(span.expression, rules) + "}";
      out += span.literal.text;
    }
    return out + "`";
  }

  if (ts.isStringLiteral(expr) && rules.stringQuote === "single") {
    return `'${expr.text.replace(/'/g, "\\'")}'`;
  }

  if (ts.isArrayLiteralExpression(expr))
    return `[${expr.elements.map((e) => walk(e, rules)).join(", ")}]`;

  if (ts.isObjectLiteralExpression(expr)) {
    const parts = expr.properties.map((p) => {
      if (ts.isPropertyAssignment(p)) return `${p.name.getText()}: ${walk(p.initializer, rules)}`;
      if (ts.isSpreadAssignment(p)) return `...${walk(p.expression, rules)}`;
      return verbatim(p);
    });
    return `{ ${parts.join(", ")} }`;
  }

  if (ts.isNonNullExpression(expr)) return `${walk(expr.expression, rules)}!`;

  if (ts.isSpreadElement(expr)) return `...${walk(expr.expression, rules)}`;

  if (ts.isAsExpression(expr)) return walk(expr.expression, rules);

  return verbatim(expr);
}

function walkStatement(stmt: ts.Statement, rules: RewriteRules): string {
  if (ts.isReturnStatement(stmt)) {
    return stmt.expression ? `return ${walk(stmt.expression, rules)};` : "return;";
  }
  if (ts.isExpressionStatement(stmt)) {
    return `${walk(stmt.expression, rules)};`;
  }
  if (ts.isVariableStatement(stmt)) {
    const kw = stmt.declarationList.flags & ts.NodeFlags.Const ? "const" : "let";
    const decls = stmt.declarationList.declarations.map((d) => {
      const name = verbatim(d.name);
      return d.initializer ? `${name} = ${walk(d.initializer, rules)}` : name;
    });
    return `${kw} ${decls.join(", ")};`;
  }
  if (ts.isBlock(stmt)) return walkBlock(stmt, rules);
  if (ts.isIfStatement(stmt)) {
    let s = `if (${walk(stmt.expression, rules)}) ${walkStatement(stmt.thenStatement, rules)}`;
    if (stmt.elseStatement) s += ` else ${walkStatement(stmt.elseStatement, rules)}`;
    return s;
  }
  if (ts.isForOfStatement(stmt)) {
    return `for (${verbatim(stmt.initializer)} of ${walk(stmt.expression, rules)}) ${walkStatement(stmt.statement, rules)}`;
  }
  return verbatim(stmt);
}

function walkBlock(block: ts.Block, rules: RewriteRules): string {
  const lines = block.statements.map((stmt) => walkStatement(stmt, rules));
  if (lines.length === 0) return "{}";
  return `{ ${lines.join(" ")} }`;
}

// `isComponent` distinguishes a callback prop on a component instance (e.g. `onValueChange`) from a
// native DOM listener (e.g. `oninput`). Component callback props are case-sensitive identifiers, so a
// `lower`-cased target must preserve their camelCase; only native listeners get lowercased.
export function rewriteEventName(name: string, rules: RewriteRules, isComponent = false): string {
  const base = name.startsWith("on") ? name.slice(2) : name;
  switch (rules.eventNameCase) {
    case "camel":
      return `on${base}`;
    case "kebab":
      return `@${base.replace(/[A-Z]/g, (c, i) => (i === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`))}`;

    case "lower":
      return isComponent ? `on${base}` : `on${base.toLowerCase()}`;
  }
}

const HTML_ATTR_MAP: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};

const REACT_ATTR_MAP: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  readonly: "readOnly",
};

// React canonicalisation (`for` → `htmlFor`, `readonly` → `readOnly`, …) is a *host DOM* concern; it
// must not touch props of a custom Inkline component, whose prop interfaces use the HTML-native
// lowercase names and would otherwise stop receiving the forwarded value (the key no longer matches
// what the child reads). Component prop names cross the boundary verbatim, matching the other six
// targets. `class` → `className` is the one deliberate exception: Inkline React components expose
// `className`, so it is preserved on components too.
const REACT_COMPONENT_ATTR_MAP: Record<string, string> = {
  class: "className",
};

// `isComponent` distinguishes an attribute on a custom component instance from one on a native host
// element (mirrors `rewriteEventName`). Only host attributes get the full React canonicalisation.
export function rewriteAttrName(name: string, rules: RewriteRules, isComponent = false): string {
  if (rules.jsxAttrCasing === "html") return HTML_ATTR_MAP[name] ?? name;
  if (rules.jsxAttrCasing === "react") {
    return (isComponent ? REACT_COMPONENT_ATTR_MAP : REACT_ATTR_MAP)[name] ?? name;
  }
  return name;
}

export function extractKeyBody(expr: ts.Expression, rules: RewriteRules): string {
  if (ts.isArrowFunction(expr) && !ts.isBlock(expr.body)) {
    return rewriteExpr(expr.body, rules);
  }
  return rewriteExpr(expr, rules);
}

/**
 * If a rewritten conditional test is a boolean literal, return it so codegen can drop the dead branch
 * instead of emitting a constant condition. This arises when `hasSlot("x")` lowers to `true` on targets
 * with no runtime slot-presence API (Qwik/Angular): `<Show when={hasSlot(...)}>` then always renders and
 * `<Show when={!hasSlot(...)}>` (`!true`) never does. Returns `undefined` for a dynamic test.
 */
export function foldConstTest(test: string): boolean | undefined {
  if (test === "true") return true;
  if (test === "false" || test === "!true") return false;
  return undefined;
}

function unwrapParens(expr: ts.Expression): ts.Expression {
  if (ts.isParenthesizedExpression(expr)) return unwrapParens(expr.expression);
  return expr;
}

function isJsxLike(expr: ts.Expression): boolean {
  const e = unwrapParens(expr);
  return ts.isJsxElement(e) || ts.isJsxSelfClosingElement(e) || ts.isJsxFragment(e);
}

export function emitExprAsTemplate(expr: ts.Expression, rules: RewriteRules): string {
  const inner = unwrapParens(expr);
  if (ts.isArrowFunction(inner) && !ts.isBlock(inner.body)) {
    return emitExprAsTemplate(inner.body, rules);
  }
  if (isJsxLike(inner)) return verbatim(inner);
  return `{${rewriteExpr(expr, rules)}}`;
}
