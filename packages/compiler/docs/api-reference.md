# API Reference

Comprehensive type reference for the public API exported from `@inkline/compiler`.

All types and functions below are importable from the package root:

```ts
import { compile, defineConfig, ... } from "@inkline/compiler";
```

---

## 1. Compilation

### `compile(input, config?)`

Compile a single `.ink.tsx` source file to one or more framework targets.

```ts
function compile(input: CompileInput, config?: Partial<InklineConfig>): Promise<CompileResult>;
```

### `compileIncremental(state, inputs, config?)`

Compile multiple files incrementally, skipping unchanged sources based on content hashing.

```ts
function compileIncremental(
  state: IncrementalState,
  inputs: readonly CompileInput[],
  config?: Partial<InklineConfig>,
): Promise<IncrementalCompileResult>;
```

### `createIncrementalState()`

Create an empty incremental compilation state to pass to `compileIncremental`.

```ts
function createIncrementalState(): IncrementalState;
```

### `CompileInput`

```ts
type CompileInput =
  | { readonly fileName: string; readonly source: string }
  | { readonly fileName: string; readonly program: ts.Program };
```

Pass `source` for single-file compilation (the compiler creates a TypeScript program internally), or pass an existing `ts.Program` for integration with a larger project.

### `CompileResult`

```ts
interface CompileResult {
  readonly module?: AnalyzedModule;
  readonly files: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>;
  readonly diagnostics: readonly Diagnostic[];
}
```

### `IncrementalState`

```ts
interface IncrementalState {
  readonly sourceHashes: ReadonlyMap<string, string>;
  readonly results: ReadonlyMap<string, CompileResult>;
}
```

### `IncrementalCompileResult`

```ts
interface IncrementalCompileResult {
  readonly files: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>;
  readonly diagnostics: readonly Diagnostic[];
  readonly nextState: IncrementalState;
  readonly changed: readonly string[];
  readonly skipped: readonly string[];
}
```

### `GeneratedFile`

```ts
interface GeneratedFile {
  readonly path: string;
  readonly contents: string;
  readonly sourceMap?: string;
}
```

---

## 2. Configuration

### `defineConfig(c)`

Identity helper for type-safe configuration. Returns the config object unchanged.

```ts
function defineConfig(c: InklineConfig): InklineConfig;
```

### `InklineConfig`

```ts
interface InklineConfig {
  readonly targets: readonly TargetName[];
  readonly outDir?: string; // default: "dist"
  readonly sourceMap?: SourceMapMode; // default: "external"
  readonly targetOptions?: Partial<Record<TargetName, Record<string, unknown>>>;
  readonly plugins?: readonly Plugin[];
  readonly verbose?: boolean; // default: false
  readonly registry?: TargetRegistry; // default: builtinRegistry
}
```

### `ResolvedCompilerOptions`

All fields are required with defaults applied:

```ts
interface ResolvedCompilerOptions {
  readonly targets: readonly TargetName[];
  readonly outDir: string;
  readonly sourceMap: SourceMapMode;
  readonly targetOptions: Readonly<Partial<Record<TargetName, Readonly<Record<string, unknown>>>>>;
  readonly plugins: readonly Plugin[];
  readonly verbose: boolean;
  readonly registry: TargetRegistry;
}
```

### `SourceMapMode`

```ts
type SourceMapMode = "external" | "inline" | "none";
```

---

## 3. IR Types

The Intermediate Representation (IR) is the core data model that sits between parsing and code generation. All IR types are deeply readonly.

### Render Nodes

Discriminated union on the `kind` field:

```ts
type IRNode =
  | IRElement
  | IRComponentInstance
  | IRText
  | IRExprNode
  | IRIf
  | IRFor
  | IRSwitch
  | IRSlotPlaceholder
  | IRFragment;
```

#### `IRElement`

```ts
interface IRElement {
  readonly kind: "Element";
  readonly tag: string;
  readonly attrs: readonly IRAttribute[];
  readonly events: readonly IREventBinding[];
  readonly refs: readonly IRRefBinding[];
  readonly children: readonly IRNode[];
  readonly isStatic: boolean;
  readonly loc: SourceLocation;
}
```

#### `IRComponentInstance`

```ts
interface IRComponentInstance {
  readonly kind: "ComponentInstance";
  readonly reference: ts.Identifier | ts.PropertyAccessExpression;
  readonly resolved?: { readonly module: string | null; readonly name: string };
  readonly attrs: readonly IRAttribute[];
  readonly events: readonly IREventBinding[];
  readonly refs: readonly IRRefBinding[];
  readonly slots: readonly IRSlotContent[];
  readonly loc: SourceLocation;
}
```

#### `IRText`

```ts
interface IRText {
  readonly kind: "Text";
  readonly value: string;
  readonly loc: SourceLocation;
}
```

#### `IRExprNode`

```ts
interface IRExprNode {
  readonly kind: "Expression";
  readonly expr: ts.Expression;
  readonly raw?: string;
  readonly deps: IRDependencySet;
  readonly isReactive: boolean;
  readonly emissionContext: "template" | "setup";
  readonly isDynamic: boolean;
  readonly loc: SourceLocation;
}
```

#### `IRIf`

```ts
interface IRIf {
  readonly kind: "If";
  readonly branches: readonly IRIfBranch[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

interface IRIfBranch {
  readonly test: IRExprNode;
  readonly body: IRNode;
}
```

#### `IRFor`

```ts
interface IRFor {
  readonly kind: "For";
  readonly each: IRExprNode;
  readonly itemBinding: string;
  readonly indexBinding?: string;
  readonly key: IRExprNode;
  readonly syntheticKey?: boolean;
  readonly body: IRNode;
  readonly loc: SourceLocation;
}
```

#### `IRSwitch`

```ts
interface IRSwitch {
  readonly kind: "Switch";
  readonly cases: readonly IRSwitchCase[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

interface IRSwitchCase {
  readonly test: IRExprNode;
  readonly body: IRNode;
}
```

#### `IRSlotPlaceholder`

```ts
interface IRSlotPlaceholder {
  readonly kind: "SlotPlaceholder";
  readonly name: string;
  readonly scopedArgs: readonly IRExprNode[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}
```

#### `IRFragment`

```ts
interface IRFragment {
  readonly kind: "Fragment";
  readonly children: readonly IRNode[];
  readonly loc: SourceLocation;
}
```

### Attributes

#### `IRAttribute`

```ts
interface IRAttribute {
  readonly name: string;
  readonly value: IRStaticValue | IRExprNode;
  readonly binding: IRAttributeBinding;
  readonly loc: SourceLocation;
}

type IRAttributeBinding = "normal" | "class" | "style" | "twoWay";
```

#### `IRStaticValue`

```ts
interface IRStaticValue {
  readonly kind: "Static";
  readonly value: string | number | boolean | null;
  readonly loc: SourceLocation;
}
```

#### `IREventBinding`

```ts
interface IREventBinding {
  readonly name: string;
  readonly handler: IRExprNode;
  readonly paramTypes?: readonly (ts.TypeNode | undefined)[];
  readonly loc: SourceLocation;
  readonly synthesized?: boolean;
}
```

#### `IRRefBinding`

```ts
interface IRRefBinding {
  readonly ref: IRExprNode;
  readonly category: IRRefCategory;
  readonly loc: SourceLocation;
}

type IRRefCategory = "element" | "component";
```

#### `IRSlotContent`

```ts
interface IRSlotContent {
  readonly name: string;
  readonly body: IRNode;
  readonly scopedParams: readonly string[];
  readonly loc: SourceLocation;
}
```

### Declarations

#### `IRProp`

```ts
interface IRProp {
  readonly name: string;
  readonly typeNode?: ts.TypeNode;
  readonly defaultValue?: IRExprNode;
  readonly required: boolean;
  readonly symbolId?: SymbolId;
  readonly loc: SourceLocation;
}
```

#### `IRSlotDeclaration`

```ts
interface IRSlotDeclaration {
  readonly name: string;
  readonly isScoped: boolean;
  readonly scopedProps: readonly IRProp[];
  readonly required: boolean;
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}
```

#### `IREventDeclaration`

```ts
interface IREventDeclaration {
  readonly name: string;
  readonly payloadType?: ts.TypeNode;
  readonly loc: SourceLocation;
}
```

#### `IRStateDeclaration`

```ts
interface IRStateDeclaration {
  readonly name: string;
  readonly setterName: string;
  readonly initial: IRExprNode;
  readonly typeNode?: ts.TypeNode;
  readonly symbolId: SymbolId;
  readonly setterSymbolId: SymbolId;
  readonly loc: SourceLocation;
}
```

#### `IRRefDeclaration`

```ts
interface IRRefDeclaration {
  readonly name: string;
  readonly symbolId: SymbolId;
  readonly category: IRRefCategory;
  readonly elementType?: string;
  readonly loc: SourceLocation;
}
```

#### `IRMemoDeclaration`

```ts
interface IRMemoDeclaration {
  readonly name: string;
  readonly symbolId: SymbolId;
  readonly expr: IRExprNode;
  readonly loc: SourceLocation;
}
```

#### `IREffectDeclaration`

```ts
interface IREffectDeclaration {
  readonly body: ts.Expression;
  readonly deps: IRDependencySet;
  readonly cleanup: IREffectCleanup;
  readonly isDynamic: boolean;
  readonly loc: SourceLocation;
}

type IREffectCleanup = "present" | "absent" | "unknown";
```

#### `IRResourceDeclaration`

```ts
interface IRResourceDeclaration {
  readonly name: string;
  readonly fetcher: IRExprNode;
  readonly source?: IRExprNode;
  readonly symbolId: SymbolId;
  readonly loadingName: string;
  readonly errorName: string;
  readonly refetchName: string;
  readonly loc: SourceLocation;
}
```

### Component

#### `IRComponent`

The top-level component node produced by the parser and consumed by code generators.

```ts
interface IRComponent {
  readonly kind: "Component";
  readonly id: string;
  readonly name: string;
  readonly loc: SourceLocation;
  readonly props: readonly IRProp[];
  readonly slots: readonly IRSlotDeclaration[];
  readonly events: readonly IREventDeclaration[];
  readonly state: readonly IRStateDeclaration[];
  readonly refs: readonly IRRefDeclaration[];
  readonly memos: readonly IRMemoDeclaration[];
  readonly effects: readonly IREffectDeclaration[];
  readonly resources: readonly IRResourceDeclaration[];
  readonly lifecycle: IRLifecycle;
  readonly setup: readonly IRSetupStatement[];
  readonly render: IRNode;
  readonly primitives: readonly PrimitiveUsage[];
  readonly expose?: readonly string[];
  readonly styles: readonly IRStyleBlock[];
  readonly runtime: IRRuntimeMode;
  readonly targetOverrides: Readonly<Partial<Record<TargetName, IRTargetOverride>>>;
}
```

#### `IRLifecycle`

```ts
interface IRLifecycle {
  readonly onMount: readonly IREffectDeclaration[];
  readonly onCleanup: readonly IREffectDeclaration[];
}
```

#### `IRSetupStatement`

```ts
interface IRSetupStatement {
  readonly stmt: ts.Statement;
  readonly defines: readonly SymbolId[];
  readonly loc: SourceLocation;
}
```

#### `IRStyleBlock`

```ts
interface IRStyleBlock {
  readonly css: string;
  readonly scoped: boolean;
  readonly lang: "css" | "scss" | "less";
  readonly loc: SourceLocation;
}
```

#### `IRRuntimeMode`

```ts
type IRRuntimeMode = "client" | "server" | "iso";
```

#### `IRTargetOverride`

```ts
interface IRTargetOverride {
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly render?: IRNode;
}
```

### Module

#### `IRModule`

```ts
interface IRModule {
  readonly version: number;
  readonly fileName: string;
  readonly components: readonly IRComponent[];
  readonly imports: readonly ts.ImportDeclaration[];
  readonly sourceFile: ts.SourceFile;
}
```

### Constants

```ts
const IR_VERSION = 1;

type PrimitiveName =
  | "createSignal"
  | "createMemo"
  | "createEffect"
  | "createRef"
  | "createResource"
  | "defineComponent"
  | "onMount"
  | "onCleanup"
  | "untrack"
  | "batch"
  | "defineSlot";

interface PrimitiveUsage {
  readonly name: PrimitiveName;
  readonly localName: string;
}
```

---

## 4. IR Utilities

### `migrate(module, target?)`

Forward-only IR version migration. Applies registered migrations sequentially from the module's current version to the target version (defaults to `IR_VERSION`). Throws if no migration path exists or if a downgrade is attempted.

```ts
function migrate(module: IRModule, target?: number): IRModule;
```

### `registerMigration(m)`

Register a custom migration step. Migrations are sorted by `from` version after registration.

```ts
function registerMigration(m: IRMigration): void;

interface IRMigration {
  readonly from: number;
  readonly to: number;
  migrate(module: IRModule): IRModule;
}
```

### `serializeModule(module)`

JSON-safe serialization. Strips `ts.SourceFile`, `ts.ImportDeclaration`, and other TS AST nodes, converting `IRExprNode.expr` to its raw text representation.

```ts
function serializeModule(module: IRModule): string;
```

### `deserializeModule(json)`

Rehydrate a serialized module. Reconstructs `ts.Expression` nodes from their raw text using a synthetic source file.

```ts
function deserializeModule(json: string): IRModule;
```

---

## 5. IR Builders

Convenience factory functions that create IR render nodes with sensible defaults. All accept an `init` object and return a readonly IR node.

```ts
function createElement(init: {
  tag: string;
  attrs?: readonly IRAttribute[];
  events?: readonly IREventBinding[];
  refs?: readonly IRRefBinding[];
  children?: readonly IRNode[];
  loc?: SourceLocation;
}): IRElement;

function createComponentInstance(init: {
  reference: ts.Identifier | ts.PropertyAccessExpression;
  resolved?: { readonly module: string | null; readonly name: string };
  attrs?: readonly IRAttribute[];
  events?: readonly IREventBinding[];
  refs?: readonly IRRefBinding[];
  slots?: readonly IRSlotContent[];
  loc?: SourceLocation;
}): IRComponentInstance;

function createText(init: { value: string; loc?: SourceLocation }): IRText;

function createExpr(init: {
  expr: ts.Expression;
  deps?: IRDependencySet;
  isReactive?: boolean;
  emissionContext?: "template" | "setup";
  isDynamic?: boolean;
  loc?: SourceLocation;
}): IRExprNode;

function createIf(init: {
  branches: readonly IRIfBranch[];
  fallback?: IRNode;
  loc?: SourceLocation;
}): IRIf;

function createFor(init: {
  each: IRExprNode;
  itemBinding: string;
  indexBinding?: string;
  key: IRExprNode;
  body: IRNode;
  loc?: SourceLocation;
}): IRFor;

function createSwitch(init: {
  cases: readonly IRSwitchCase[];
  fallback?: IRNode;
  loc?: SourceLocation;
}): IRSwitch;

function createSlotPlaceholder(init: {
  name?: string; // default: "default"
  scopedArgs?: readonly IRExprNode[];
  fallback?: IRNode;
  loc?: SourceLocation;
}): IRSlotPlaceholder;

function createFragment(init: { children: readonly IRNode[]; loc?: SourceLocation }): IRFragment;

function createAttribute(init: {
  name: string;
  value: IRStaticValue | IRExprNode;
  binding?: IRAttributeBinding; // default: "normal"
  loc?: SourceLocation;
}): IRAttribute;

function createStaticValue(init: {
  value: string | number | boolean | null;
  loc?: SourceLocation;
}): IRStaticValue;
```

---

## 6. IR Visitors

### `walkRenderTree(root, visitor)`

Depth-first walk of the render tree. Calls `enter` before descending into children and `exit` after. Return `false` from `enter` to skip the subtree.

```ts
function walkRenderTree(root: IRNode, visitor: IRVisitor): void;

function walkNode(node: IRNode, visitor: IRVisitor, parent?: IRNode): void;

interface IRVisitor {
  enter?: (node: IRNode, parent?: IRNode) => void | false;
  exit?: (node: IRNode, parent?: IRNode) => void;
}
```

### `transform(root, transformer)`

Immutable structural transform. Returns a new tree where nodes returned from `enter`/`exit` replace the original. Return `SKIP` from `enter` to leave a subtree unchanged.

```ts
function transform(root: IRNode, transformer: IRTransformer): IRNode;

function transformComponent(component: IRComponent, transformer: IRTransformer): IRComponent;

interface IRTransformer {
  enter?: (node: IRNode, parent?: IRNode) => IRNode | typeof SKIP | void;
  exit?: (node: IRNode, parent?: IRNode) => IRNode | void;
}

const SKIP: unique symbol;
```

---

## 7. Reactivity

### `SymbolId`

Branded string type for unique reactive symbol identifiers.

```ts
type SymbolId = string & { readonly __brand: unique symbol };
```

### `IRReactiveKind`

```ts
type IRReactiveKind = "signal" | "memo" | "effect" | "prop" | "context" | "ref";
```

### `IRReactiveSymbol`

```ts
interface IRReactiveSymbol {
  readonly id: SymbolId;
  readonly kind: IRReactiveKind;
  readonly name: string;
  readonly setterId?: SymbolId;
  readonly loc: SourceLocation;
}
```

### `IRDependency`

```ts
interface IRDependency {
  readonly symbolId: SymbolId;
  readonly kind: IRReactiveKind;
  readonly name: string;
  readonly path: readonly string[];
  readonly conditional: boolean;
}
```

### `IRDependencySet`

```ts
type IRDependencySet = readonly IRDependency[];
```

### `SymbolTable`

Mutable during compilation, frozen after analysis. Tracks reactive symbols per component, links getters to setters, and resolves TypeScript symbols to `SymbolId`.

```ts
class SymbolTable {
  mint(args: {
    componentId: string;
    kind: IRReactiveKind;
    name: string;
    loc: SourceLocation;
    tsSymbol?: ts.Symbol;
  }): SymbolId;

  linkSetter(getterId: SymbolId, setterId: SymbolId): void;
  resolve(tsSymbol: ts.Symbol): SymbolId | undefined;
  get(id: SymbolId): IRReactiveSymbol | undefined;
  forComponent(componentId: string): readonly IRReactiveSymbol[];
  setterOf(getterId: SymbolId): SymbolId | undefined;
  freeze(): void;
}
```

---

## 8. Target API

### `Target`

```ts
interface Target {
  readonly name: TargetName;
  readonly rewrites: RewriteRules;
  readonly conformance?: TargetConformanceSpec;
  readonly defaultOptions?: Readonly<Record<string, unknown>>;
  emit(component: IRComponent, ctx: CodegenContext): CodeModule;
}
```

### `TargetName`

```ts
type TargetName = "react" | "solid" | "vue" | "svelte" | "angular" | "qwik" | "astro";
```

### `TargetPlan`

A lightweight subset of `Target` used during planning (before full codegen is needed).

```ts
type TargetPlan = Pick<Target, "name" | "rewrites"> & {
  readonly conformance?: TargetConformanceSpec;
};
```

### `RewriteRules`

Controls how the shared expression rewriter transforms reactive reads, setters, refs, attribute casing, and event naming for each target.

```ts
interface RewriteRules {
  readonly reactiveRead: ReactiveReadKind;
  readonly setterStyle: SetterStyleKind;
  readonly refAccess: RefAccessKind;
  readonly jsxAttrCasing: "react" | "html";
  readonly eventNameCase: "camel" | "kebab" | "lower";
  readonly members?: MemberRewriteRules;
}
```

Where:

```ts
type ReactiveReadKind =
  | { readonly kind: "strip-call" }
  | { readonly kind: "preserve-call" }
  | { readonly kind: "field-access"; readonly field: string };

type SetterStyleKind =
  | { readonly kind: "function-call" }
  | { readonly kind: "field-assignment"; readonly field: string }
  | { readonly kind: "direct-assignment" };

type RefAccessKind = { readonly kind: "field"; readonly field: string } | { readonly kind: "bare" };
```

### `MemberRewriteRules`

```ts
interface MemberRewriteRules {
  readonly props?: { readonly strip: boolean };
  readonly slots?: { readonly strip: boolean; readonly rename?: Readonly<Record<string, string>> };
}
```

### `TargetConformanceSpec`

```ts
interface TargetConformanceSpec {
  readonly controlFlowImports: {
    readonly if?: ControlFlowImportSpec;
    readonly for?: ControlFlowImportSpec;
    readonly switch?: ControlFlowImportSpec;
  };
  readonly lint: {
    readonly eslintConfig: string;
    readonly requiredPlugins: readonly string[];
  };
  readonly typecheck: {
    readonly tsconfig: string;
    readonly dtsImports: readonly string[];
  };
  readonly invariants: ReadonlyArray<(file: GeneratedFile) => readonly Diagnostic[]>;
}

interface ControlFlowImportSpec {
  readonly module: string;
  readonly named?: readonly string[];
}
```

### `TargetRegistry`

```ts
interface TargetRegistry {
  get(name: TargetName): Target | undefined;
  has(name: TargetName): boolean;
  list(): readonly TargetName[];
}
```

### `CodegenContext`

Passed to `Target.emit()` with the resolved options, diagnostics collector, symbol table, and rewrite rules for the current target.

```ts
interface CodegenContext {
  readonly diagnostics: DiagnosticCollector;
  readonly options: ResolvedCompilerOptions;
  readonly symbols: SymbolTable;
  readonly rewrites: RewriteRules;
}
```

### `CodeModule`

```ts
interface CodeModule {
  readonly componentName: string;
  readonly root: Code;
  readonly fileName: string;
}
```

### Target functions

```ts
function defineTarget(t: Target): Target;
function createRegistry(): MutableTargetRegistry;

interface MutableTargetRegistry extends TargetRegistry {
  register(target: Target): void;
}

const builtinRegistry: TargetRegistry;
```

### Built-in targets

Seven targets ship with the compiler:

| Export          | Target  | Style          |
| --------------- | ------- | -------------- |
| `reactTarget`   | React   | JSX            |
| `solidTarget`   | Solid   | JSX            |
| `qwikTarget`    | Qwik    | JSX            |
| `vueTarget`     | Vue     | SFC (template) |
| `svelteTarget`  | Svelte  | SFC (template) |
| `angularTarget` | Angular | Template-based |
| `astroTarget`   | Astro   | Meta-target    |

---

## 9. Plugin API

### `Plugin`

```ts
interface Plugin {
  readonly name: string;
  readonly targets?: readonly TargetName[];
  readonly hooks: PluginHooks;
}
```

### `PluginHooks`

```ts
interface PluginHooks {
  "ir:post"?: (module: AnalyzedModule, ctx: PluginContext) => void | Promise<void>;
  "code:post"?: (
    target: TargetName,
    files: readonly GeneratedFile[],
    ctx: PluginContext,
  ) => void | readonly GeneratedFile[] | Promise<void | readonly GeneratedFile[]>;
}
```

- `ir:post` runs after analysis (P4), before codegen. Use it to inspect or mutate the analyzed IR module.
- `code:post` runs after codegen and printing for each target. Return a modified `GeneratedFile[]` to replace the output.

### `PluginContext`

```ts
interface PluginContext {
  readonly pushDiagnostic: (d: Diagnostic) => void;
  readonly options: ResolvedCompilerOptions;
}
```

### `definePlugin(p)`

Identity helper for type-safe plugin definitions.

```ts
function definePlugin(p: Plugin): Plugin;
```

---

## 10. Code IR

The Code IR is the output-side intermediate representation that target `emit()` functions produce. The printer converts Code IR trees into final source text.

### `Code` (discriminated union)

```ts
type Code =
  | CFile
  | CScript
  | CImport
  | CStmt
  | CExpr
  | CRaw
  | CJsxElement
  | CJsxAttr
  | CJsxText
  | CTmplElement
  | CTmplDirective
  | CTmplAttr
  | CTmplText
  | CTmplMustache
  | CGroup
  | CIndent
  | CStyle;
```

All Code IR nodes extend `CNodeBase`:

```ts
interface CNodeBase {
  readonly kind: Code["kind"];
  readonly span?: SourceLocation;
  readonly hints?: readonly string[];
}
```

### Container nodes

#### `CFile`

Top-level container. `flavor` controls syntax mode.

```ts
interface CFile extends CNodeBase {
  readonly kind: "CFile";
  readonly flavor: "js-jsx" | "sfc-vue" | "sfc-svelte" | "ts" | "tsx";
  readonly children: readonly Code[];
}
```

#### `CScript`

SFC script block (Vue, Svelte).

```ts
interface CScript extends CNodeBase {
  readonly kind: "CScript";
  readonly lang: "ts" | "js";
  readonly setup: boolean;
  readonly children: readonly Code[];
}
```

#### `CImport`

```ts
interface CImport extends CNodeBase {
  readonly kind: "CImport";
  readonly module: string;
  readonly defaultLocal?: string;
  readonly named?: readonly { readonly imported: string; readonly local?: string }[];
  readonly typeOnly?: boolean;
}
```

#### `CStmt`

```ts
interface CStmt extends CNodeBase {
  readonly kind: "CStmt";
  readonly body: string | CExpr;
}
```

#### `CExpr`

```ts
interface CExpr extends CNodeBase {
  readonly kind: "CExpr";
  readonly text: string;
}
```

#### `CRaw`

Raw text passed through to output unchanged.

```ts
interface CRaw extends CNodeBase {
  readonly kind: "CRaw";
  readonly text: string;
}
```

### JSX nodes (React, Solid, Qwik)

#### `CJsxElement`

```ts
interface CJsxElement extends CNodeBase {
  readonly kind: "CJsxElement";
  readonly tag: string;
  readonly attrs: readonly CJsxAttr[];
  readonly children: readonly Code[];
  readonly selfClose: boolean;
}
```

#### `CJsxAttr`

```ts
interface CJsxAttr extends CNodeBase {
  readonly kind: "CJsxAttr";
  readonly name: string;
  readonly value:
    | { readonly kind: "static"; readonly text: string }
    | { readonly kind: "expr"; readonly expr: CExpr }
    | { readonly kind: "boolean" };
}
```

#### `CJsxText`

```ts
interface CJsxText extends CNodeBase {
  readonly kind: "CJsxText";
  readonly text: string;
}
```

### Template nodes (Vue, Svelte)

#### `CTmplElement`

```ts
interface CTmplElement extends CNodeBase {
  readonly kind: "CTmplElement";
  readonly tag: string;
  readonly directives: readonly CTmplDirective[];
  readonly attrs: readonly CTmplAttr[];
  readonly children: readonly Code[];
  readonly selfClose: boolean;
}
```

#### `CTmplDirective`

```ts
interface CTmplDirective extends CNodeBase {
  readonly kind: "CTmplDirective";
  readonly directive: string;
  readonly arg?: string;
  readonly modifier?: readonly string[];
  readonly expr?: CExpr;
}
```

#### `CTmplAttr`

```ts
interface CTmplAttr extends CNodeBase {
  readonly kind: "CTmplAttr";
  readonly name: string;
  readonly value:
    | { readonly kind: "static"; readonly text: string }
    | { readonly kind: "expr"; readonly expr: CExpr };
}
```

#### `CTmplText`

```ts
interface CTmplText extends CNodeBase {
  readonly kind: "CTmplText";
  readonly text: string;
}
```

#### `CTmplMustache`

```ts
interface CTmplMustache extends CNodeBase {
  readonly kind: "CTmplMustache";
  readonly expr: CExpr;
}
```

### Formatting nodes

#### `CGroup`

```ts
interface CGroup extends CNodeBase {
  readonly kind: "CGroup";
  readonly children: readonly Code[];
  readonly fit?: boolean;
}
```

#### `CIndent`

```ts
interface CIndent extends CNodeBase {
  readonly kind: "CIndent";
  readonly children: readonly Code[];
}
```

### Style node

#### `CStyle`

```ts
interface CStyle extends CNodeBase {
  readonly kind: "CStyle";
  readonly css: string;
  readonly scoped: boolean;
}
```

### Code IR Builders

Factory functions that create Code IR nodes. All accept an `init` object.

```ts
function cFile(init: {
  flavor: CFile["flavor"];
  children: readonly Code[];
  span?: SourceLocation;
}): CFile;
function cScript(init: {
  lang?: "ts" | "js";
  setup?: boolean;
  children: readonly Code[];
  span?: SourceLocation;
}): CScript;
function cImport(init: {
  module: string;
  defaultLocal?: string;
  named?: readonly { readonly imported: string; readonly local?: string }[];
  typeOnly?: boolean;
  span?: SourceLocation;
}): CImport;
function cStmt(init: { body: string | CExpr; span?: SourceLocation }): CStmt;
function cExpr(init: { text: string; span?: SourceLocation }): CExpr;
function cRaw(init: { text: string; span?: SourceLocation }): CRaw;
function cJsxElement(init: {
  tag: string;
  attrs?: readonly CJsxAttr[];
  children?: readonly Code[];
  selfClose?: boolean;
  span?: SourceLocation;
}): CJsxElement;
function cJsxAttr(init: {
  name: string;
  value: CJsxAttr["value"];
  span?: SourceLocation;
}): CJsxAttr;
function cJsxText(init: { text: string; span?: SourceLocation }): CJsxText;
function cTmplElement(init: {
  tag: string;
  directives?: readonly CTmplDirective[];
  attrs?: readonly CTmplAttr[];
  children?: readonly Code[];
  selfClose?: boolean;
  span?: SourceLocation;
}): CTmplElement;
function cTmplDirective(init: {
  directive: string;
  arg?: string;
  modifier?: readonly string[];
  expr?: CExpr;
  span?: SourceLocation;
}): CTmplDirective;
function cTmplAttr(init: {
  name: string;
  value: CTmplAttr["value"];
  span?: SourceLocation;
}): CTmplAttr;
function cTmplText(init: { text: string; span?: SourceLocation }): CTmplText;
function cTmplMustache(init: { expr: CExpr; span?: SourceLocation }): CTmplMustache;
function cGroup(init: { children: readonly Code[]; fit?: boolean; span?: SourceLocation }): CGroup;
function cIndent(init: { children: readonly Code[]; span?: SourceLocation }): CIndent;
function cStyle(init: { css: string; scoped: boolean; span?: SourceLocation }): CStyle;
```

---

## 11. Printer

### `print(root, opts?)`

Convert a Code IR tree to a source string with optional source map generation.

```ts
function print(root: Code, opts?: Partial<PrintOptions>): PrintResult;
```

### `PrintOptions`

```ts
interface PrintOptions {
  readonly indent: number; // default: 2
  readonly newline: "\n" | "\r\n"; // default: "\n"
  readonly sourceMap: SourceMapMode; // default: "none"
  readonly file?: string;
}
```

### `PrintResult`

```ts
interface PrintResult {
  readonly code: string;
  readonly map?: string; // present when sourceMap is not "none"
}
```

---

## 12. Diagnostics

### `Diagnostic`

```ts
interface Diagnostic {
  readonly code: DiagnosticCode;
  readonly severity: DiagnosticSeverity;
  readonly title: string;
  readonly help?: string;
  readonly url: string;
  readonly loc: SourceLocation;
}
```

### `DiagnosticSeverity`

```ts
type DiagnosticSeverity = "error" | "warning" | "info";
```

### `DiagnosticCode`

```ts
type DiagnosticCode = keyof typeof DIAGNOSTICS;
```

### `DIAGNOSTICS`

Constant map of all diagnostic codes to their metadata:

| Code      | Severity | Title                                                   |
| --------- | -------- | ------------------------------------------------------- |
| `INK0001` | error    | Namespace import of @inkline/core is not supported      |
| `INK0010` | warning  | Effect has no reactive dependencies; it runs once       |
| `INK0011` | warning  | Memo has no reactive dependencies; it never recomputes  |
| `INK0020` | warning  | Dynamic reactive read prevents static dep tracking      |
| `INK0030` | error    | createMemo cycle detected: {cycle}                      |
| `INK0040` | error    | defineComponent must have a setup function              |
| `INK0041` | error    | defineComponent options must be a static object literal |
| `INK0050` | warning  | Missing key in iteration                                |
| `INK0060` | error    | `<Show>` requires a 'when' prop                         |
| `INK0061` | info     | Nullish-coalescing (??) in JSX is ambiguous             |
| `INK0062` | error    | `<For>` requires an 'each' prop                         |
| `INK0070` | error    | Component-ref forwarding is not yet supported           |
| `INK0080` | warning  | Unknown target option: {key}                            |
| `INK0090` | error    | Plugin '{name}' threw: {message}                        |
| `INK0100` | error    | Parse failure in component '{name}': {message}          |
| `INK0110` | error    | Internal compiler error: {message}                      |

Each entry provides `severity`, `title`, `help` (optional), and `url` linking to full documentation.
