import type { Target, TargetName, TargetRegistry } from "./context.ts";

export interface MutableTargetRegistry extends TargetRegistry {
  register(target: Target): void;
}

export function defineTarget(t: Target): Target {
  return t;
}

export function createRegistry(): MutableTargetRegistry {
  const targets = new Map<TargetName, Target>();
  return {
    get: (name) => targets.get(name),
    has: (name) => targets.has(name),
    list: () => [...targets.keys()],
    register(target) {
      targets.set(target.name, target);
    },
  };
}

const _builtin = createRegistry();

export const builtinRegistry: TargetRegistry = _builtin;
