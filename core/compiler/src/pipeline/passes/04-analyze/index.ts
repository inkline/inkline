import type { IRModule } from "../../../ir/render/nodes.ts";
import type { Pass } from "../../types.ts";
import { buildReactivityGraph, type ReactivityGraph } from "./graph.ts";
import { diagnoseCycles, validateAttrFallthrough, validateComponent } from "./validate.ts";

export interface AnalyzedModule {
  readonly module: IRModule;
  readonly graphs: ReadonlyMap<string, ReactivityGraph>;
}

export const analyzePass: Pass<IRModule, AnalyzedModule> = {
  name: "analyze",
  run(module, ctx) {
    const graphs = new Map<string, ReactivityGraph>();
    const localComponents = new Map(module.components.map((c) => [c.name, c]));

    for (const component of module.components) {
      const graph = buildReactivityGraph(component);
      graphs.set(component.id, graph);

      validateComponent(component, ctx);
      validateAttrFallthrough(component, localComponents, ctx);
      diagnoseCycles(component, graph, ctx);
    }

    return { module, graphs };
  },
};

export { buildReactivityGraph, type ReactivityGraph } from "./graph.ts";
export { validateComponent, validateAttrFallthrough, diagnoseCycles } from "./validate.ts";
