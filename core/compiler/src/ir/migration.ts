import type { IRComponent, IRModule } from "./render/nodes.ts";
import { IR_VERSION } from "./render/nodes.ts";

export interface IRMigration {
  readonly from: number;
  readonly to: number;
  migrate(module: IRModule): IRModule;
}

const migrations: IRMigration[] = [
  {
    from: 0,
    to: 1,
    migrate(module) {
      return { ...module, version: 1 };
    },
  },
  {
    from: 1,
    to: 2,
    // IRComponent gained a required `models` array (and IREventDeclaration gained optional `kind`/
    // `propName`). Default `models` to `[]` on v1 IR; existing events need no rewrite.
    migrate(module) {
      return {
        ...module,
        version: 2,
        components: module.components.map((c) => {
          const legacy = c as IRComponent & { models?: IRComponent["models"] };
          return { ...legacy, models: legacy.models ?? [] };
        }),
      };
    },
  },
  {
    from: 2,
    to: 3,
    // IRComponent gained an optional `meta` ({ headless? }). It is optional, so absent `meta` already
    // means "not headless" — no component rewrite is needed, only a version bump.
    migrate(module) {
      return { ...module, version: 3 };
    },
  },
];

export function migrate(module: IRModule, target: number = IR_VERSION): IRModule {
  const current = module.version ?? 0;

  if (target < current) {
    throw new Error(`Cannot downgrade IR from version ${current} to ${target}`);
  }
  if (target === current) return module;

  let result = module;
  for (const m of migrations) {
    if (m.from >= target) break;
    if (m.from < current) continue;
    result = m.migrate(result);
  }

  if ((result.version ?? 0) !== target) {
    throw new Error(`No migration path from version ${current} to ${target}`);
  }

  return result;
}

export function registerMigration(m: IRMigration): void {
  migrations.push(m);
  migrations.sort((a, b) => a.from - b.from);
}

export { IR_VERSION } from "./render/nodes.ts";
