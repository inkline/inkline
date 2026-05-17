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

## 6. Add conformance spec

Create `src/codegen/targets/<name>/conformance.ts`:

```ts
import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

export const <name>Conformance: TargetConformanceSpec = {
  controlFlowImports: {
    // Solid: { if: { module: "solid-js", named: ["Show"] } }
    // Others: empty {}
  },
  lint: {
    eslintConfig: "./tsconfigs/<name>.eslintrc.json",
    requiredPlugins: ["<name>"],
  },
  typecheck: {
    tsconfig: "./tsconfigs/<name>.tsconfig.json",
    dtsImports: ["<framework-package>"],
  },
  invariants: [requireFileExtension(".<ext>")],
};
```

Wire into target: `import { <name>Conformance } from "./conformance.ts"` and add `conformance: <name>Conformance` to the Target object:

```ts
export const <name>: Target = {
  name: "<name>",
  rewrites: REWRITES,
  conformance: <name>Conformance,
  emit,
};
```

## 7. Handle styles

If the target uses SFC format (Vue, Svelte), append `component.styles` as CStyle nodes in the emit function:

```ts
...component.styles.map((s) => cStyle({ css: s.css, scoped: s.scoped })),
```

If the target uses JSX (React, Solid, Qwik), emit CSS module import when styles exist:

```ts
const styleImport =
  component.styles.length > 0
    ? [cRaw({ text: `import styles from "./${component.name}.module.css";` })]
    : [];
```

## 8. Handle resources

For each `component.resources`, emit the framework's async data pattern. The pattern varies by target:

- **React**: `const data = use(fetcher)`
- **Solid**: `createResource(fetcher)` (native)
- **Vue**: `const data = ref(await (fetcher)())`
- **Angular**: `signal(await (fetcher)())`

## 9. Handle runtime directive

Check `component.runtime` and emit framework-specific directives:

- **React**: `"use client"` / `"use server"` / nothing (for `"iso"`)

```ts
if (component.runtime === "client") {
  body.unshift(cRaw({ text: `"use client";` }));
} else if (component.runtime === "server") {
  body.unshift(cRaw({ text: `"use server";` }));
}
```

## 10. Add tests

Create `src/codegen/targets/<name>/index.test.ts` that builds an `IRComponent` with signals, memos, and JSX, calls `emit()`, and verifies the printed output contains the expected framework patterns.

## 11. Re-export from index.ts

```ts
export { <name> as <name>Target } from "./codegen/targets/<name>/index.ts";
```

## Existing targets as reference

The compiler ships with 7 built-in targets across three paradigms:

- **JSX-based**: React (`src/codegen/targets/react/`), Solid (`src/codegen/targets/solid/`), Qwik (`src/codegen/targets/qwik/`)
- **SFC-based**: Vue (`src/codegen/targets/vue/`), Svelte (`src/codegen/targets/svelte/`)
- **Template-based**: Angular (`src/codegen/targets/angular/`)
- **Meta-target**: Astro (`src/codegen/targets/astro/`)

Study targets in the same paradigm as your new target. JSX targets share the most structure (imports, JSX element emission, CSS module handling). SFC targets share template and script block patterns. Angular uses its own template syntax with directives.
