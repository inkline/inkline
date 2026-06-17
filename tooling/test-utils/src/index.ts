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

export { isMountable, mountForTarget, type MountResult } from "./mount.ts";

export { coverInkViaReact, type CoverResult } from "./coverage.ts";

export { normalizeHtml } from "./normalize.ts";

export { resolveComponent } from "./resolve.ts";

export type { TargetName, GeneratedFile, Diagnostic } from "@inkline/compiler";
