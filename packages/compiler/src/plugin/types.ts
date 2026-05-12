import type { TargetName } from "../codegen/context.ts";

export interface PluginHooks {
  "ir:post"?: (...args: readonly unknown[]) => void | Promise<void>;
  "code:post"?: (...args: readonly unknown[]) => unknown;
}

export interface Plugin {
  readonly name: string;
  readonly targets?: readonly TargetName[];
  readonly hooks: PluginHooks;
}

export function definePlugin(p: Plugin): Plugin {
  return p;
}
