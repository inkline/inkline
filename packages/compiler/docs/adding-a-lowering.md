# Adding a Lowering

A lowering is an IR→IR transformation applied during P3 (lower). Each lowering is a function `(component: IRComponent, ctx: PassContext) => IRComponent`.

## 1. Create the lowering file

```
src/pipeline/passes/03-lower/my-transform.ts
```

## 2. Implement the transformer

Use `transformComponent` from `ir/render/transform.ts` for render-tree transforms, or modify component-level declarations directly.

### Render-tree transform example

```ts
import type { IRComponent } from "../../../ir/render/nodes.ts";
import { transformComponent } from "../../../ir/render/transform.ts";
import type { PassContext } from "../../types.ts";

export function myTransform(component: IRComponent, ctx: PassContext): IRComponent {
  return transformComponent(component, {
    enter(node) {
      // Return a new node to replace, SKIP to skip children, or void to keep
      if (node.kind === "Element" && node.tag === "old-tag") {
        return { ...node, tag: "new-tag" };
      }
    },
    exit(node) {
      // Post-order processing (children already transformed)
    },
  });
}
```

### Key conventions

- **Structural sharing**: only spread-copy nodes you actually change. If nothing changes, return the original reference (`transformComponent` checks `render === component.render`).
- **assertNever**: every `switch (node.kind)` must end with `default: assertNever(node)` to catch missing IR kinds at compile time.
- **Diagnostics**: push via `ctx.diagnostics.push("INK0xxx", loc)`.
- **No mutation**: IR nodes are `readonly`. Create new objects with spread.

## 3. Register in the lowering pipeline

In `src/pipeline/passes/03-lower/index.ts`, add your lowering to the `lowerings` array. Order matters — lowerings run sequentially per component:

```ts
const lowerings: readonly Lowering[] = [
  slots,
  controlFlow,
  twoWayBinding,
  events,
  refs,
  keyWarnings,
  myTransform, // ← add here
  staticMark, // staticMark should usually be last (bottom-up computation)
];
```

## 4. Add tests

Create `src/pipeline/passes/03-lower/my-transform.test.ts`. Build IR fragments with the builders (`createElement`, `createText`, etc.), run your lowering, and assert the output shape.

## Existing lowerings

| Lowering          | Purpose                                                                |
| ----------------- | ---------------------------------------------------------------------- |
| `slots`           | Move JSX children and JSX-valued attrs into named slots                |
| `control-flow`    | `<Show>`→IRIf, `<For>`→IRFor, `<Switch>`→IRSwitch, ternary/&& lowering |
| `two-way-binding` | Desugar `$bind:value` into value attr + synthesized event              |
| `events`          | Extract handler parameter types from arrow/function expressions        |
| `refs`            | Classify element vs component refs, infer HTML element types           |
| `key-warnings`    | Push INK0050 for synthesized iteration keys                            |
| `static-mark`     | Bottom-up compute `IRElement.isStatic`                                 |
