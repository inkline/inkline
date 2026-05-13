# Adding a Target

A target teaches the compiler how to emit code for a specific framework. Each target lives in `src/codegen/targets/<name>/index.ts` and exports a `Target` object.

## 1. Create the target file

```
src/codegen/targets/qwik/index.ts
```

## 2. Define RewriteRules

RewriteRules control how the shared `expr-rewrite.ts` transforms expressions:

```ts
import type { Target, RewriteRules, CodegenContext, CodeModule } from "../../context.ts";
import type { IRComponent } from "../../../ir/render/nodes.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "strip-call" }, // count() → count
  setterStyle: { kind: "function-call" }, // setCount(x)
  refAccess: { kind: "bare" }, // ref (no .current)
  jsxAttrCasing: "html", // class, not className
  eventNameCase: "camel", // onClick
};
```

Available options:

- `reactiveRead`: `strip-call` | `preserve-call` | `{ kind: "field-access", field: "value" }`
- `setterStyle`: `function-call` | `direct-assignment` | `{ kind: "field-assignment", field: "value" }`
- `refAccess`: `bare` | `{ kind: "field", field: "current" }`
- `jsxAttrCasing`: `"react"` (className) | `"html"` (class)
- `eventNameCase`: `"camel"` (onClick) | `"lower"` (onclick) | `"kebab"` (@click)

## 3. Implement the emit function

The emit function converts an `IRComponent` into a `CodeModule` containing a Code IR tree:

```ts
function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  // 1. Build imports based on component.state, .memos, .effects, .refs
  // 2. Generate setup/declaration statements
  // 3. Walk component.render recursively to produce Code IR nodes
  // 4. Wrap in CFile

  return {
    componentName: component.name,
    root: cFile({ flavor: "tsx", children: [...imports, ...body] }),
    fileName: `${component.name}.tsx`,
  };
}
```

Use the Code IR builders (`cFile`, `cImport`, `cStmt`, `cExpr`, `cJsxElement`, etc.) and the shared `rewriteExpr()` for expression transformation.

## 4. Export the target

```ts
export const qwik: Target = { name: "qwik", rewrites: REWRITES, emit };
export default qwik;
```

## 5. Register in builtinRegistry

In `src/codegen/registry.ts`, add:

```ts
import { qwik as qwikTarget } from "./targets/qwik/index.ts";
_builtin.register(qwikTarget);
```

## 6. Add tests

Create `src/codegen/targets/qwik/index.test.ts` that builds an `IRComponent` with signals, memos, and JSX, calls `emit()`, and verifies the printed output contains the expected framework patterns.

## 7. Re-export from index.ts

```ts
export { qwik as qwikTarget } from "./codegen/targets/qwik/index.ts";
```
