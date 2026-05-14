export { compileFixture, type CompiledFixture } from "./harness.ts";
export {
  runConformanceInvariants,
  requireFileExtension,
  requireContains,
  type Invariant,
} from "./conformance.ts";
export {
  expectMappingAt,
  verifyIdentifierMappings,
  type IdentifierMapping,
  type IdentifierVerification,
} from "./sourcemap.ts";
export { computeCoverageFromModules, type CoverageReport } from "./coverage.ts";
export { typecheckEmittedForTarget, type TypecheckResult } from "./typecheck.ts";
export { lintEmittedForTarget, type LintResult } from "./lint.ts";
export { mountForTarget, type MountResult } from "./mount.ts";
export { runScenarioAcrossTargets, type EquivalenceResult } from "./equivalence.ts";
export { runBenchSuite, saveBaseline, type BenchResult, type BenchSuiteResult } from "./bench.ts";
export {
  scenarios,
  type Scenario,
  type ScenarioAsserts,
  type EventStep,
} from "../__fixtures__/scenarios.ts";
