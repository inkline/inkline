import type { IRModule } from "./render/nodes.ts";
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
