import type { TargetName } from "../codegen/context.ts";
import type { IRNode } from "../ir/render/nodes.ts";
import { walkRenderTree } from "../ir/render/visit.ts";
import type { AnalyzedModule } from "../pipeline/compile.ts";

export interface CoverageReport {
  readonly coveredByTarget: Readonly<Record<string, ReadonlySet<IRNode["kind"]>>>;
  readonly missingByTarget: Readonly<Record<string, readonly IRNode["kind"][]>>;
  readonly allCovered: boolean;
}

const ALL_KINDS: readonly IRNode["kind"][] = [
  "Element",
  "ComponentInstance",
  "Text",
  "Expression",
  "If",
  "For",
  "Switch",
  "SlotPlaceholder",
  "Fragment",
];

export function computeCoverageFromModules(
  modules: Iterable<{ target: TargetName; module: AnalyzedModule }>,
): CoverageReport {
  const covered = new Map<string, Set<IRNode["kind"]>>();

  for (const { target, module } of modules) {
    const set = covered.get(target) ?? new Set();
    covered.set(target, set);

    for (const comp of module.module.components) {
      walkRenderTree(comp.render, {
        enter(node) {
          set.add(node.kind);
        },
      });
    }
  }

  const missingByTarget: Record<string, IRNode["kind"][]> = {};
  let allCovered = true;

  for (const [target, kinds] of covered) {
    const missing = ALL_KINDS.filter((k) => !kinds.has(k));
    missingByTarget[target] = missing;
    if (missing.length > 0) allCovered = false;
  }

  return {
    coveredByTarget: Object.fromEntries([...covered.entries()].map(([k, v]) => [k, v])),
    missingByTarget,
    allCovered,
  };
}
