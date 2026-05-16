import * as ts from "typescript";
import type { IRModule, IRExprNode } from "./render/nodes.ts";
import type { SourceLocation } from "./types.ts";

interface SerializedExpr {
  kind: "Expression";
  raw: string;
  deps: unknown;
  isReactive: boolean;
  emissionContext: "template" | "setup";
  isDynamic: boolean;
  loc: SourceLocation;
}

const SKIP_KEYS = new Set(["sourceFile", "imports", "stmt", "typeNode", "reference"]);

export function serializeModule(module: IRModule): string {
  const serializable = {
    version: module.version,
    fileName: module.fileName,
    components: module.components,
  };

  return JSON.stringify(serializable, (key, value) => {
    if (SKIP_KEYS.has(key)) return undefined;

    if (value && typeof value === "object" && "kind" in value && value.kind === "Expression") {
      const expr = value as IRExprNode;
      const raw = expr.raw ?? (expr.expr.getSourceFile?.() ? expr.expr.getText() : "");
      return {
        kind: "Expression",
        raw,
        deps: expr.deps,
        isReactive: expr.isReactive,
        emissionContext: expr.emissionContext,
        isDynamic: expr.isDynamic,
        loc: expr.loc,
      } satisfies SerializedExpr;
    }

    if (
      key === "body" &&
      value &&
      typeof value === "object" &&
      !("kind" in value) &&
      "pos" in value
    ) {
      const node = value as ts.Node;
      const sf = node.getSourceFile?.();
      return sf ? node.getText(sf) : undefined;
    }

    if (key === "expr" && value && typeof value === "object" && "pos" in value) {
      return undefined;
    }

    if (value instanceof Map) return Object.fromEntries(value);
    if (value instanceof Set) return [...value];
    return value;
  });
}

export function deserializeModule(json: string): IRModule {
  const parsed = JSON.parse(json);

  const sf = ts.createSourceFile("_empty.tsx", "", ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);

  const seen = new WeakSet<object>();
  const rehydrate = (obj: unknown): void => {
    if (!obj || typeof obj !== "object") return;
    if (seen.has(obj as object)) return;
    seen.add(obj as object);

    if (Array.isArray(obj)) {
      for (const item of obj) rehydrate(item);
      return;
    }

    const rec = obj as Record<string, unknown>;
    if (rec.kind === "Expression" && typeof rec.raw === "string" && !rec.expr) {
      const raw = rec.raw as string;
      const cacheSf = ts.createSourceFile(
        "_cache.tsx",
        `(${raw})`,
        ts.ScriptTarget.ESNext,
        true,
        ts.ScriptKind.TSX,
      );
      const stmt = cacheSf.statements[0];
      if (stmt && ts.isExpressionStatement(stmt) && ts.isParenthesizedExpression(stmt.expression)) {
        rec.expr = stmt.expression.expression;
      }
    }

    for (const value of Object.values(rec)) {
      rehydrate(value);
    }
  };

  rehydrate(parsed);

  return {
    ...parsed,
    sourceFile: sf,
    imports: [],
  } as IRModule;
}
