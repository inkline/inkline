import type { Target, TargetName, TargetRegistry } from "./context.ts";
import { solid as solidTarget } from "./targets/solid/index.ts";
import { react as reactTarget } from "./targets/react/index.ts";
import { svelte as svelteTarget } from "./targets/svelte/index.ts";
import { vue as vueTarget } from "./targets/vue/index.ts";
import { angular as angularTarget } from "./targets/angular/index.ts";
import { qwik as qwikTarget } from "./targets/qwik/index.ts";
import { astro as astroTarget } from "./targets/astro/index.ts";

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
_builtin.register(solidTarget);
_builtin.register(reactTarget);
_builtin.register(svelteTarget);
_builtin.register(vueTarget);
_builtin.register(angularTarget);
_builtin.register(qwikTarget);
_builtin.register(astroTarget);

export const builtinRegistry: TargetRegistry = {
  get: (name) => _builtin.get(name),
  has: (name) => _builtin.has(name),
  list: () => _builtin.list(),
};
