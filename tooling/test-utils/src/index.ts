export {
  compileComponent,
  compileSource,
  type ComponentTestResult,
  type CompileComponentOptions,
} from "./compile.ts";

export {
  expectCompilationSuccess,
  expectDiagnostics,
  expectNoDiagnostics,
  expectCorrectFileExtensions,
  expectOutputContains,
  expectOutputNotContains,
  expectImports,
} from "./assertions.ts";

export { assertConformance } from "./conformance.ts";

export { snapshotOutput } from "./snapshot.ts";

export {
  assertHtmlEquivalence,
  mountComponent,
  type EquivalenceOptions,
  type EquivalenceResult,
} from "./equivalence.ts";

export { isMountable, mountForTarget, type MountResult, type AngularMountHost } from "./mount.ts";

export { prepareStyledAngularChain, type StyledAngularChain } from "./angular-chain.ts";

export { normalizeHtml } from "./normalize.ts";

export { resolveComponent } from "./resolve.ts";

// The Angular attribute-selector registry: built over a styled component + the headless parts it
// composes so they classify as directives/elements (instead of silently reverting to `ink-*`
// wrappers when compiled in isolation). Re-exported so SSR helpers have a single import source.
export { analyzeOnly, buildAngularRegistry } from "@inkline/compiler";
export type {
  TargetName,
  GeneratedFile,
  Diagnostic,
  AngularRegistry,
  AngularComponentEntry,
} from "@inkline/compiler";
