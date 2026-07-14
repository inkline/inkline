# @inkline/compiler

A write-once, compile-everywhere component compiler. Author UI components in `.ink.tsx` using a signal-based reactivity model, and compile them to native **React**, **Vue 3**, **Svelte 5**, **Solid**, **Angular**, **Qwik**, and **Astro** components.

```
Counter.ink.tsx  ──>  react/Counter.tsx
                 ──>  vue/Counter.vue
                 ──>  svelte/Counter.svelte
                 ──>  solid/Counter.tsx
                 ──>  angular/Counter.component.ts
                 ──>  qwik/Counter.tsx
                 ──>  astro/Counter.astro
```

## Installation

```bash
npm install @inkline/compiler
# or
pnpm add @inkline/compiler
```

TypeScript >= 5.4 is required as a peer dependency.

## Quick Start

### 1. Create a Component

```tsx
// src/components/Counter.ink.tsx
import { createSignal, createMemo, createEffect, defineComponent } from "@inkline/core";

export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);

  createEffect(() => {
    console.log("count changed:", count());
  });

  return (
    <div>
      <p>{count()}</p>
      <p>{doubled()}</p>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
```

### 2. Compile

```bash
npx inkline compile src/components/Counter.ink.tsx --target react,vue,svelte,solid --out-dir dist
```

### 3. Use the Output

```
dist/
  react/Counter.tsx           # React component using useState, useMemo, useEffect
  vue/Counter.vue             # Vue 3 SFC with <script setup>, ref(), computed()
  svelte/Counter.svelte       # Svelte 5 component with $state, $derived, $effect
  solid/Counter.tsx           # Solid component with createSignal, createMemo
  angular/Counter.component.ts # Angular standalone component with signals
  qwik/Counter.tsx            # Qwik component with useSignal / useComputed$
  astro/Counter.astro         # Astro component (static render)
```

Each output is a standalone, idiomatic component for its target framework. No runtime dependency on `@inkline/core`.

---

## Component Authoring

### Primitives

Components are authored in `.ink.tsx` files using a signal-based API imported from `@inkline/core`:

| Primitive                     | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| `createSignal(initial)`       | Reactive state. Returns `[getter, setter]`.                         |
| `createMemo(() => expr)`      | Derived value that recomputes when dependencies change.             |
| `createEffect(() => { ... })` | Side effect that re-runs when dependencies change.                  |
| `createRef()`                 | Template reference to a DOM element.                                |
| `onMount(() => { ... })`      | Runs once after the component mounts.                               |
| `onCleanup(() => { ... })`    | Runs when the component unmounts.                                   |
| `untrack(() => expr)`         | Reads a signal without tracking it as a dependency.                 |
| `batch(() => { ... })`        | Batches multiple signal updates into one reaction cycle.            |
| `hasSlot(name?)`              | Whether a (named, or default) slot was filled. See [Slots](#slots). |
| `defineComponent(setup)`      | Wraps a setup function into a component definition.                 |

### Reactive Reads

Signals are read by calling the getter as a function:

```tsx
const [count, setCount] = createSignal(0);
const value = count(); // reactive read
setCount(count() + 1); // update
```

The compiler tracks which signals each expression reads and maps them to the target's reactivity system:

| Source        | React         | Solid         | Vue               | Svelte      |
| ------------- | ------------- | ------------- | ----------------- | ----------- |
| `count()`     | `count`       | `count()`     | `count`           | `count`     |
| `setCount(x)` | `setCount(x)` | `setCount(x)` | `count.value = x` | `count = x` |

### Props

Props can be defined two ways:

**TypeScript parameter type** (preferred):

```tsx
export default defineComponent((props: { label: string; disabled?: boolean }) => {
  return <button disabled={props.disabled}>{props.label}</button>;
});
```

**Options object** (for defaults and metadata):

```tsx
export default defineComponent(
  {
    props: {
      color: "blue", // default value, optional
      size: Number, // required, no default
      count: { type: Number, required: true, default: 0 },
    },
    slots: {
      default: {},
      header: { scoped: true },
    },
    events: {
      change: {},
    },
  },
  (props) => {
    return <div style={`color: ${props.color}`}>{props.size}</div>;
  },
);
```

### Two-way binding and custom events

`defineModel(name = "value")` declares a two-way-bindable prop plus its paired `update:<name>` event,
returning a signal tuple like `createSignal`. The getter reads the incoming prop; the setter emits the
update:

```tsx
import { defineComponent, defineModel } from "@inkline/core";

export default defineComponent(() => {
  const [value, setValue] = defineModel("value");
  return <input value={value()} onInput={(e) => setValue(e.currentTarget.value)} />;
});
```

A parent binds it with `$bind:<prop>={state}` (pass the signal getter); the compiler wires both
directions:

```tsx
const [text, setText] = createSignal("");
<MyInput $bind:value={text} />;
```

Each target emits its native two-way idiom:

| Target        | Child (declaration)                     | Parent (`$bind:value={text}`)              |
| ------------- | --------------------------------------- | ------------------------------------------ |
| Vue           | `defineModel<T>("value")`               | `v-model:value="text"`                     |
| Svelte        | `value = $bindable()`                   | `bind:value={text}`                        |
| Angular       | `value = model<T>()`                    | `[value]="text()" (valueChange)="…set(…)"` |
| React / Solid | `value` prop + `onUpdateValue` callback | `value={text} onUpdateValue={…}`           |
| Qwik          | `value` prop + `onUpdateValue$` QRL     | `value={text.value} onUpdateValue$={…}`    |
| Astro         | render-only `value` prop                | `value={text}` (one-way; static SSR)       |

`$bind:` also works on native elements (`<input $bind:value={text} />`).

For arbitrary custom events, `defineEmits` returns an `emit` function:

```tsx
import { defineComponent, defineEmits } from "@inkline/core";

export default defineComponent(() => {
  const emit = defineEmits<{ change: [value: string] }>();
  return <button onClick={() => emit("change", "hi")}>Go</button>;
});
```

`emit("change", x)` becomes a callback prop (`props.onChange?.(x)`) in React/Solid, a QRL callback in
Qwik, a `defineEmits`/`emit` pair in Vue, a callback prop in Svelte, and `this.change.emit(x)` from an
`@Output()` in Angular. (Custom events are inert on the static Astro target — diagnostic `INK0045`.)

### Slots

A component declares its slots in the options object and renders them with the `<Slot>` component
(the default slot is the lowercase `<slot>` JSX intrinsic). A `<Slot>` may wrap fallback content,
shown when the slot is empty.

```tsx
import { defineComponent, Slot } from "@inkline/core";

export default defineComponent({ slots: { default: {}, prefix: {} } }, () => {
  return (
    <div>
      <span class="prefix">
        <Slot name="prefix" />
      </span>
      <slot>Default content</slot>
    </div>
  );
});
```

A consumer fills a named slot by passing JSX to a matching attribute (`<MyField prefix={<Icon />} />`);
the compiler lowers it to each target's slot mechanism (a `render<Name>` prop on React/Solid, a
`<template #name>` on Vue, a `{#snippet}` on Svelte, …).

**`hasSlot(name?)`** reports whether a slot was filled, so a component can omit a wrapper when its
slot is empty (`hasSlot()` checks the default slot):

```tsx
import { defineComponent, Show, Slot, hasSlot } from "@inkline/core";

export default defineComponent({ slots: { prefix: {} } }, () => {
  return (
    <Show when={hasSlot("prefix")}>
      <span class="prefix">
        <Slot name="prefix" />
      </span>
    </Show>
  );
});
```

It lowers to each target's runtime slot-presence read:

| Target  | `hasSlot("prefix")`          |
| ------- | ---------------------------- |
| React   | `props.renderPrefix != null` |
| Solid   | `props.prefix != null`       |
| Svelte  | `prefixSnippet != null`      |
| Vue     | `!!$slots.prefix`            |
| Astro   | `Astro.slots.has("prefix")`  |
| Qwik    | `true`                       |
| Angular | `true`                       |

Qwik and Angular expose no runtime slot-presence API, so `hasSlot` is `true` there (the gated
content always renders) and the compiler emits an info diagnostic (`INK0068`). Pair it with a CSS
`:empty` rule so the wrapper collapses when its slot is empty on those targets.

### Control Flow

Control flow uses JSX components that the compiler lowers to framework-native patterns:

**Conditional rendering:**

```tsx
import { Show } from "@inkline/core";

<Show when={visible()} fallback={<span>Hidden</span>}>
  <span>Visible</span>
</Show>;
```

| Target | Output                                                          |
| ------ | --------------------------------------------------------------- |
| React  | `{visible ? <span>Visible</span> : <span>Hidden</span>}`        |
| Solid  | `<Show when={visible()} fallback={...}>`                        |
| Vue    | `<span v-if="visible">Visible</span><span v-else>Hidden</span>` |
| Svelte | `{#if visible}...{:else}...{/if}`                               |

**Lists:**

```tsx
import { For } from "@inkline/core";

<For each={items()} key={(item) => item.id}>
  {(item, index) => (
    <li>
      {index}: {item.label}
    </li>
  )}
</For>;
```

**Switch/Match:**

```tsx
import { Switch, Match } from "@inkline/core";

<Switch>
  <Match when={tab() === "a"}>
    <p>Tab A</p>
  </Match>
  <Match when={tab() === "b"}>
    <p>Tab B</p>
  </Match>
</Switch>;
```

### Lifecycle Hooks

```tsx
import { onMount, onCleanup, defineComponent } from "@inkline/core";

export default defineComponent(() => {
  onMount(() => {
    console.log("mounted");
  });

  onCleanup(() => {
    console.log("unmounted");
  });

  return <div>Hello</div>;
});
```

### Template Refs

```tsx
import { createRef, onMount, defineComponent } from "@inkline/core";

export default defineComponent(() => {
  const inputRef = createRef();

  onMount(() => {
    inputRef.current?.focus();
  });

  return <input ref={inputRef} placeholder="auto-focus" />;
});
```

### Multiple Components Per File

```tsx
const Label = defineComponent((props: { text: string }) => {
  return <span>{props.text}</span>;
});

const Counter = defineComponent(() => {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <Label text={String(count())} />
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});

export default Counter;
```

---

## Configuration

### Config File

Create `inkline.config.ts` (or `.js` / `.mjs`) in your project root:

```ts
import { defineConfig } from "@inkline/compiler";

export default defineConfig({
  targets: ["react", "vue", "svelte", "solid"],
  outDir: "dist/components",
  sourceMap: "external",
  verbose: false,
});
```

### Options

| Option          | Type                                          | Default      | Description                                                                                                                                                                                                              |
| --------------- | --------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `targets`       | `TargetName[]`                                | (required)   | Targets to compile for.                                                                                                                                                                                                  |
| `srcDir`        | `string`                                      | —            | Source root to strip from output paths (e.g. `"src"`). When set, directory structure below `srcDir` is preserved in the output. Without it, the deepest common prefix is used. Also available as `--src-dir` on the CLI. |
| `outDir`        | `string`                                      | `"dist"`     | Output directory. Files are written to `<outDir>/<target>/`.                                                                                                                                                             |
| `sourceMap`     | `"external" \| "inline" \| "none"`            | `"external"` | Source map generation mode.                                                                                                                                                                                              |
| `targetOptions` | `Record<TargetName, Record<string, unknown>>` | `{}`         | Per-target options. Unknown keys produce INK0080 warnings.                                                                                                                                                               |
| `plugins`       | `Plugin[]`                                    | `[]`         | Compiler plugins.                                                                                                                                                                                                        |
| `verbose`       | `boolean`                                     | `false`      | Log detailed plugin errors.                                                                                                                                                                                              |
| `registry`      | `TargetRegistry`                              | built-in     | Custom target registry (advanced).                                                                                                                                                                                       |

### Available Targets

| Name      | Output          | Framework                                         |
| --------- | --------------- | ------------------------------------------------- |
| `react`   | `.tsx`          | React 19 (hooks API)                              |
| `solid`   | `.tsx`          | Solid.js 1.8+                                     |
| `vue`     | `.vue`          | Vue 3 (Composition API, `<script setup>`)         |
| `svelte`  | `.svelte`       | Svelte 5 (runes: `$state`, `$derived`, `$effect`) |
| `angular` | `.component.ts` | Angular standalone components (signals)           |
| `qwik`    | `.tsx`          | Qwik (resumable, `useSignal` / `useComputed$`)    |
| `astro`   | `.astro`        | Astro (static render)                             |

All seven are registered in the built-in registry ([`src/codegen/registry.ts`](./src/codegen/registry.ts)).

---

## CLI

The `inkline` CLI ships in [`@inkline/cli`](../../tooling/cli/). It exposes four commands:

```
inkline <command> [options]

Commands:
  compile <glob>   Compile .ink.tsx files and generate stories.
  check <file>     Run diagnostics on a file without writing output.
  init             Initialize an Inkline project.
  add <component>  Add a component to your project.
```

### Compile

```bash
# Single target
inkline compile src/IButton.ink.tsx --target react

# Multiple targets
inkline compile "src/**/*.ink.tsx" --target react,vue,svelte,solid,angular,qwik,astro --out-dir dist

# With config file (targets come from inkline.config.ts)
inkline compile "src/**/*.ink.tsx" --config inkline.config.ts

# Source maps
inkline compile src/IButton.ink.tsx --target react --source-map inline

# Watch and recompile on change
inkline compile "src/**/*.ink.tsx" --config inkline.config.ts --watch
```

Flags: `--target`, `--src-dir`, `--out-dir` (default `dist`), `--source-map` (`external` | `inline` | `none`, default `external`), `--config`, `--clean` (default `true`), `--watch`, `--verbose`. `--target` is required unless the config file sets `targets`. CLI flags override config file values.

### Check

Report diagnostics without producing output:

```bash
inkline check src/Counter.ink.tsx --target react
```

### Init

Scaffold Inkline into the current project. Pass `--compiler` to also generate `inkline.config.ts`, an example component, and build scripts:

```bash
inkline init --framework react --compiler
```

### Add

```bash
inkline add IButton
```

`add` is registered but not yet implemented — it currently prints a notice.

---

## Programmatic API

### Basic Compilation

```ts
import { compile } from "@inkline/compiler";

const result = await compile(
  { fileName: "Counter.ink.tsx", source: sourceCode },
  { targets: ["react", "vue"] },
);

// result.files.react → GeneratedFile[]
// result.files.vue   → GeneratedFile[]
// result.diagnostics → Diagnostic[]
// result.module      → AnalyzedModule (IR + reactivity graphs)
```

### CompileResult

```ts
interface CompileResult {
  readonly module?: AnalyzedModule;
  readonly files: Partial<Record<TargetName, readonly GeneratedFile[]>>;
  readonly diagnostics: readonly Diagnostic[];
}

interface GeneratedFile {
  readonly path: string; // e.g. "Counter.tsx"
  readonly contents: string; // generated source code
  readonly sourceMap?: string; // V3 source map JSON
}
```

### Working with the IR

The compiler exposes its full intermediate representation for advanced use cases:

```ts
import { compile, walkRenderTree } from "@inkline/compiler";

const result = await compile({ fileName: "Counter.ink.tsx", source }, { targets: ["react"] });

const module = result.module!;

for (const component of module.module.components) {
  console.log(`Component: ${component.name}`);
  console.log(`  Props: ${component.props.map((p) => p.name).join(", ")}`);
  console.log(`  Signals: ${component.state.map((s) => s.name).join(", ")}`);
  console.log(`  Memos: ${component.memos.map((m) => m.name).join(", ")}`);
  console.log(`  Effects: ${component.effects.length}`);

  // Walk the render tree
  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "Element") console.log(`    <${node.tag}>`);
    },
  });
}

// Reactivity graphs
for (const [componentId, graph] of module.graphs) {
  console.log(`Graph for ${componentId}:`, graph.edges.size, "edges");
  if (graph.cycles.length > 0) {
    console.log("  Cycles detected:", graph.cycles);
  }
}
```

### Transforming the IR

```ts
import { transform, transformComponent, SKIP } from "@inkline/compiler";

const transformed = transformComponent(component, {
  enter(node) {
    // Remove all <div> wrappers
    if (node.kind === "Element" && node.tag === "div" && node.children.length === 1) {
      return node.children[0]!;
    }
    return node;
  },
});
```

---

## Plugin System

Plugins can inspect the IR after analysis and modify generated output:

```ts
import { definePlugin } from "@inkline/compiler";

const myPlugin = definePlugin({
  name: "my-plugin",
  hooks: {
    // Inspect IR after analysis (read-only)
    "ir:post": (analyzedModule, ctx) => {
      for (const comp of analyzedModule.module.components) {
        if (comp.props.length === 0) {
          ctx.pushDiagnostic({
            code: "INK0010",
            severity: "warning",
            title: `Component "${comp.name}" has no props`,
            url: "",
            loc: comp.loc,
          });
        }
      }
    },

    // Transform generated output
    "code:post": (target, files, ctx) => {
      return files.map((f) => ({
        ...f,
        contents: `// Generated by @inkline/compiler\n${f.contents}`,
      }));
    },
  },
});
```

### Plugin Options

| Field             | Type                             | Description                                                         |
| ----------------- | -------------------------------- | ------------------------------------------------------------------- |
| `name`            | `string`                         | Plugin name (appears in error messages).                            |
| `targets`         | `TargetName[]`                   | Limit `code:post` to specific targets. Omit for all.                |
| `hooks.ir:post`   | `(module, ctx) => void`          | Fires after P4 analyze. Cannot modify the module.                   |
| `hooks.code:post` | `(target, files, ctx) => files?` | Fires after P6 print, per target. Return replacement files or void. |

Throwing plugins are caught and reported as INK0090 diagnostics. The next plugin continues.

### Using Plugins

```ts
// inkline.config.ts
import { defineConfig } from "@inkline/compiler";
import myPlugin from "./plugins/my-plugin.ts";

export default defineConfig({
  targets: ["react", "vue"],
  plugins: [myPlugin],
});
```

---

## Creating a UI Library

### Project Structure

```
my-ui-library/
├── inkline.config.ts
├── src/
│   ├── IButton.ink.tsx
│   ├── Card.ink.tsx
│   ├── Input.ink.tsx
│   └── Modal.ink.tsx
├── dist/
│   ├── react/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── vue/
│   │   ├── Button.vue
│   │   └── ...
│   ├── svelte/
│   │   ├── Button.svelte
│   │   └── ...
│   └── solid/
│       ├── Button.tsx
│       └── ...
└── package.json
```

### Config

```ts
// inkline.config.ts
import { defineConfig } from "@inkline/compiler";

export default defineConfig({
  targets: ["react", "vue", "svelte", "solid"],
  outDir: "dist",
  sourceMap: "external",
});
```

### Build Script

```json
{
  "scripts": {
    "build": "inkline compile \"src/**/*.ink.tsx\"",
    "check": "inkline check \"src/**/*.ink.tsx\""
  }
}
```

### Package Exports

Publish each target as a separate entry point:

```json
{
  "name": "my-ui-library",
  "exports": {
    "./react": "./dist/react/index.ts",
    "./vue": "./dist/vue/index.ts",
    "./svelte": "./dist/svelte/index.ts",
    "./solid": "./dist/solid/index.ts"
  }
}
```

Consumers install your library and import from the entry point matching their framework:

```ts
// In a React app
import { Button, Card } from "my-ui-library/react";

// In a Vue app
import { Button, Card } from "my-ui-library/vue";
```

### Programmatic Build

For build tools and custom pipelines:

```ts
import { compile } from "@inkline/compiler";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import glob from "fast-glob";

const files = glob.sync("src/**/*.ink.tsx");

for (const file of files) {
  const source = readFileSync(file, "utf-8");
  const result = await compile(
    { fileName: file, source },
    { targets: ["react", "vue", "svelte", "solid"] },
  );

  for (const diagnostic of result.diagnostics) {
    console.warn(`${diagnostic.code}: ${diagnostic.title}`);
  }

  for (const [target, generated] of Object.entries(result.files)) {
    for (const out of generated ?? []) {
      const outPath = resolve("dist", target, out.path);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, out.contents);
    }
  }
}
```

---

## Custom Targets

Register a custom target for frameworks not built in:

```ts
import { defineTarget, createRegistry, builtinRegistry } from "@inkline/compiler";
import type { IRComponent, CodegenContext, CodeModule } from "@inkline/compiler";
import { cFile, cStmt, cImport, cJsxElement } from "@inkline/compiler";

const myTarget = defineTarget({
  name: "react", // must be a valid TargetName
  rewrites: {
    reactiveRead: { kind: "strip-call" },
    setterStyle: { kind: "function-call" },
    refAccess: { kind: "field", field: "current" },
    jsxAttrCasing: "react",
    eventNameCase: "camel",
  },
  emit(component: IRComponent, ctx: CodegenContext): CodeModule {
    // Build a Code IR tree and return it
    const file = cFile({
      flavor: "tsx",
      children: [
        cImport({ module: "my-framework", named: [{ imported: "component" }] }),
        cStmt({ body: `export const ${component.name} = component(...)` }),
      ],
    });
    return { componentName: component.name, root: file, fileName: `${component.name}.tsx` };
  },
});

const registry = createRegistry();
registry.register(myTarget);

// Use with compile()
const result = await compile(input, { targets: ["react"], registry });
```

See `docs/adding-a-target.md` for a complete walkthrough.

---

## Diagnostics

The compiler produces diagnostics at each pipeline stage. Errors prevent output; warnings are informational.

| Code    | Severity | Description                                                                                                                             |
| ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| INK0001 | error    | Namespace import (`import * as`) of @inkline/core is not supported. Use named imports.                                                  |
| INK0010 | warning  | Effect has no reactive dependencies and will only run once.                                                                             |
| INK0011 | warning  | Memo has no reactive dependencies and will never recompute.                                                                             |
| INK0020 | warning  | Dynamic reactive read (e.g., `obj[key()]`) prevents static dependency tracking. React targets fall back to recomputing on every render. |
| INK0030 | error    | Circular dependency between memos detected.                                                                                             |
| INK0040 | error    | `defineComponent` must receive a setup function.                                                                                        |
| INK0050 | warning  | `<For>` loop is missing a `key` prop.                                                                                                   |
| INK0060 | error    | `<Show>` requires a `when` prop.                                                                                                        |
| INK0062 | error    | `<For>` requires an `each` prop.                                                                                                        |
| INK0070 | error    | Component-ref forwarding is not yet supported (v1).                                                                                     |
| INK0080 | warning  | Unknown key in `targetOptions`.                                                                                                         |
| INK0090 | error    | A plugin threw an exception.                                                                                                            |
| INK0100 | error    | Component failed during emit. Other components continue.                                                                                |

Run `inkline check <file>` to check without producing output.

---

## Testing Utilities

The `@inkline/compiler/testing` entry point provides harnesses for validating emitted code:

```ts
import {
  compileFixture,
  typecheckEmittedForTarget,
  lintEmittedForTarget,
  mountForTarget,
  runScenarioAcrossTargets,
  runBenchSuite,
  runConformanceInvariants,
  expectMappingAt,
  verifyIdentifierMappings,
} from "@inkline/compiler/testing";
```

| Harness                                                   | Description                                                                                     |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `compileFixture(name, targets)`                           | Compile a fixture from `__fixtures__/` by name.                                                 |
| `typecheckEmittedForTarget(conformance, files)`           | Run `tsc` against emitted files using the target's tsconfig.                                    |
| `lintEmittedForTarget(conformance, files)`                | Run ESLint against emitted files using the target's config.                                     |
| `mountForTarget(target, file, props?)`                    | SSR-render a generated file using the target's framework runtime. Returns `{ html, warnings }`. |
| `runScenarioAcrossTargets(fixture, targets, props?)`      | Compile + mount across all targets, normalize HTML, check equivalence.                          |
| `runBenchSuite()`                                         | Run tinybench performance suite with baseline comparison.                                       |
| `expectMappingAt(file, line, col)`                        | Assert a source-map mapping exists at a position.                                               |
| `verifyIdentifierMappings(file, identifiers, tolerance?)` | Verify identifier positions round-trip through source maps.                                     |

---

## v0 Limitations

The following features are deferred to v1:

- **Component-ref forwarding** (element refs work; component refs emit INK0070)
- **Scoped CSS / `<style>` blocks**
- **Server/client component boundaries**
- **Async components / Suspense / `createResource`**
- **HMR** (the CLI's `--watch` recompiles on change; in-place hot module replacement still needs a Vite plugin wrapper)
- **Sub-expression source-map granularity** (maps at statement/element level)

See `docs/scope.md` for the full v1 roadmap.

## License

MIT
