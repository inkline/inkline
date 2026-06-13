// Shared test harness for the per-target codegen suites in `codegen/targets/<target>/`.
//
// Two test styles share this module:
//   - Unit emit   — hand-build IR, call `emitCode(target, comp)`, assert the string. Used by
//                   `<target>/index.test.ts`. Fixtures here (counter state, transitions, …) are
//                   centralized so every target emits byte-identical IR → snapshots are stable.
//   - Integration — `compileTo(fixture, target)` compiles a real `.ink.tsx` fixture and returns
//                   the generated code. Used by `<target>/__tests__/<feature>.test.ts`.

import * as ts from "typescript";
import { expect } from "vitest";
import { UNKNOWN_LOCATION } from "../ir/types.ts";
import { DYNAMIC_DEPS, SymbolTable, type SymbolId } from "../ir/reactivity.ts";
import type { IRComponent, IRNode } from "../ir/render/nodes.ts";
import {
  createElement,
  createExpr,
  createIf,
  createText,
  createTransition,
} from "../ir/render/builders.ts";
import { createDiagnosticCollector } from "../core/diagnostics/collector.ts";
import { resolveOptions } from "../core/options.ts";
import type {
  CodegenContext,
  GeneratedFile,
  Target,
  TargetConformanceSpec,
  TargetName,
} from "../codegen/context.ts";
import { cRaw } from "../codegen/code-ir/builders.ts";
import { print } from "../codegen/print/printer.ts";
import { compileFixture, type CompiledFixture } from "./harness.ts";

/** Run a target conformance spec's invariants against a file, returning any diagnostics. */
export function runInvariants(conformance: TargetConformanceSpec, file: GeneratedFile) {
  return conformance.invariants.flatMap((inv) => inv(file));
}

// ── Integration: compile a fixture to a single target ────────────────────────

const fixtureCache = new Map<string, Promise<CompiledFixture>>();

function compiled(fixture: string, target: TargetName): Promise<CompiledFixture> {
  const key = `${fixture}:${target}`;
  let pending = fixtureCache.get(key);
  if (!pending) {
    pending = compileFixture(fixture, [target]);
    fixtureCache.set(key, pending);
  }
  return pending;
}

/** Compile `fixture` to `target` and return the first generated file's contents. */
export async function compileTo(fixture: string, target: TargetName): Promise<string> {
  const result = await compiled(fixture, target);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  expect(files!.length).toBeGreaterThan(0);
  return files![0]!.contents;
}

/** Like {@link compileTo}, but also asserts the compile produced no error diagnostics. */
export async function compileToChecked(fixture: string, target: TargetName): Promise<string> {
  const result = await compiled(fixture, target);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  expect(result.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
  return files![0]!.contents;
}

/** Compile `fixture` to `target` and join every generated file (for multi-component fixtures). */
export async function compileToAll(fixture: string, target: TargetName): Promise<string> {
  const result = await compiled(fixture, target);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files!.map((f) => f.contents).join("\n");
}

/** Compile `fixture` to `target` and return each generated file's contents (multi-file fixtures). */
export async function compileToFiles(fixture: string, target: TargetName): Promise<string[]> {
  const result = await compiled(fixture, target);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files!.map((f) => f.contents);
}

/** Fixtures snapshotted by every target's `output-snapshots.test.ts`. */
export const CORE_FIXTURES = [
  "Counter",
  "IButton",
  "Conditional",
  "ForLoop",
  "Lifecycle",
  "ElementRef",
  "FormField",
  "SwitchTabs",
  "Composite",
  "PropDefaults",
  "MultipleComponentsPerFile",
] as const;

export const NEW_FIXTURES = [
  "ControlledSelect",
  "ConditionalClass",
  "MemoChain",
  "MixedControlFlow",
  "BatchUpdates",
  "MultiRefs",
  "ControlledTextarea",
  "DynamicList",
  "EffectCleanup",
  "SlotWithDefault",
  "SlotBasic",
  "SlotNamed",
  "SlotWithFallback",
  "SlotScoped",
  "SlotScopedSingle",
  "DefineSlotBasic",
  "SlotInConditional",
  "ModelInput",
  "EmitButton",
  "BoundField",
  "NativeBind",
  "MultiChildSlot",
  "HasSlot",
  "HasSlotFallback",
] as const;

// ── Unit emit: hand-built IR → emitted source ────────────────────────────────

export const loc = UNKNOWN_LOCATION;

/** Parse a snippet of TS into its first expression — for building IR expression nodes inline. */
export function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

/** A minimal component (no state/memos/effects) with overridable fields. */
export function makeComp(
  name: string,
  render: IRNode,
  overrides?: Partial<IRComponent>,
): IRComponent {
  return {
    kind: "Component",
    id: `t.tsx#${name}`,
    name,
    loc,
    props: [],
    slots: [],
    events: [],
    models: [],
    state: [],
    refs: [],
    memos: [],
    effects: [],
    resources: [],
    provides: [],
    consumes: [],
    lifecycle: { onMount: [], onCleanup: [] },
    setup: [],
    render,
    primitives: [],
    styles: [],
    runtime: "iso",
    targetOverrides: {},
    ...overrides,
  };
}

/**
 * A component carrying the canonical counter reactivity: a `count` signal, a `doubled` memo, and a
 * `console.log` effect. This is the base used by the cross-target snapshot tests, so every target
 * emits identical IR and the snapshots only differ by framework, not by input.
 */
export function richComp(
  name: string,
  render: IRNode,
  overrides?: Partial<IRComponent>,
): IRComponent {
  return makeComp(name, render, {
    state: [
      {
        name: "count",
        setterName: "setCount",
        initial: createExpr({ expr: mockExpr("0") }),
        symbolId: "t::signal::count@0" as SymbolId,
        setterSymbolId: "t::signal::setCount@10" as SymbolId,
        loc,
      },
    ],
    memos: [
      {
        name: "doubled",
        symbolId: "t::memo::doubled@20" as SymbolId,
        expr: createExpr({
          expr: mockExpr("count() * 2"),
          deps: [
            {
              symbolId: "t::signal::count@0" as SymbolId,
              kind: "signal",
              name: "count",
              path: [],
              conditional: false,
            },
          ],
          isReactive: true,
        }),
        loc,
      },
    ],
    effects: [
      {
        body: mockExpr('() => { console.log("effect") }'),
        deps: DYNAMIC_DEPS,
        cleanup: "absent",
        isDynamic: false,
        loc,
      },
    ],
    ...overrides,
  });
}

export function makeCtx(target: Target): CodegenContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: [target.name] }),
    symbols: new SymbolTable(),
    rewrites: target.rewrites,
    contexts: [],
    externalImports: [],
    componentImports: [],
    typeDeclarations: [],
  };
}

/** A ctx whose `externalImports` carries a single `virtual:styleframe` import. */
export function makeCtxWithExternalImport(target: Target): CodegenContext {
  return {
    ...makeCtx(target),
    externalImports: [cRaw({ text: 'import { badge } from "virtual:styleframe";' })],
  };
}

/** A ctx whose `componentImports` carries a single `IBadgeBase` component import. */
export function makeCtxWithComponentImport(target: Target): CodegenContext {
  return {
    ...makeCtx(target),
    componentImports: [
      { localName: "IBadgeBase", componentName: "IBadgeBase", relativePath: "../IBadgeBase" },
    ],
  };
}

/** Emit `comp` for `target` with an explicit `ctx` and return the printed source. */
export function emitWithCtx(target: Target, comp: IRComponent, ctx: CodegenContext): string {
  return print(target.emit(comp, ctx).root).code;
}

/** Emit `comp` for `target` and return the printed source. */
export function emitCode(target: Target, comp: IRComponent): string {
  return emitWithCtx(target, comp, makeCtx(target));
}

/** Emit `comp` for `target`, returning both the output file name and the printed source. */
export function emitWithFile(
  target: Target,
  comp: IRComponent,
): {
  readonly fileName: string;
  readonly code: string;
} {
  const module = target.emit(comp, makeCtx(target));
  return { fileName: module.fileName, code: print(module.root).code };
}

// ── Shared render fixtures (used across multiple targets' snapshot tests) ─────

/** The canonical Counter render tree: `<div><p>{count()}</p><button>+1</button></div>`. */
export const counterRender: IRNode = createElement({
  tag: "div",
  children: [
    createElement({
      tag: "p",
      children: [createExpr({ expr: mockExpr("count()"), isReactive: true })],
    }),
    createElement({
      tag: "button",
      events: [
        {
          name: "onClick",
          handler: createExpr({ expr: mockExpr("() => setCount(count() + 1)") }),
          loc,
        },
      ],
      children: [createText({ value: "+1" })],
    }),
  ],
});

/** A `<Transition name="fade">` wrapping a single-branch `<Show>`. */
export const transitionWithIf: IRNode = createTransition({
  name: "fade",
  child: createIf({
    branches: [
      {
        test: createExpr({ expr: mockExpr("count()") }),
        body: createElement({ tag: "p", children: [createText({ value: "Hello" })] }),
      },
    ],
  }),
});

/** A `<Transition name="slide" appear>` wrapping a `<Show>` with a fallback. */
export const transitionAppear: IRNode = createTransition({
  name: "slide",
  appear: true,
  child: createIf({
    branches: [
      {
        test: createExpr({ expr: mockExpr("count()") }),
        body: createElement({ tag: "div", children: [createText({ value: "Content" })] }),
      },
    ],
    fallback: createText({ value: "Hidden" }),
  }),
});

/** The two typed props (`label` required, `disabled` optional) used by props snapshot tests. */
export function propsLabelDisabled(): IRComponent["props"] {
  return [
    { name: "label", required: true, symbolId: "t::prop::label@0" as SymbolId, loc },
    { name: "disabled", required: false, symbolId: "t::prop::disabled@1" as SymbolId, loc },
  ];
}

/** An element ref (`inputRef` → HTMLInputElement) used by ref snapshot tests. */
export function elementRef(): IRComponent["refs"] {
  return [
    {
      name: "inputRef",
      symbolId: "t::ref::inputRef@0" as SymbolId,
      category: "element" as const,
      elementType: "HTMLInputElement",
      loc,
    },
  ];
}

/** A scoped style block (`button { color: red; }`) used by style snapshot tests. */
export function scopedButtonStyle(): IRComponent["styles"] {
  return [{ css: "button { color: red; }", scoped: true, lang: "css" as const, loc }];
}
