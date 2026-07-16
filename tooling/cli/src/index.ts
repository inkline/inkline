import { defineCommand, runMain } from "citty";

const command = defineCommand({
  meta: { name: "inkline", description: "Inkline CLI" },
  subCommands: {
    compile: () => import("./commands/compile.ts").then((m) => m.default),
    check: () => import("./commands/check.ts").then((m) => m.default),
    init: () => import("./commands/init.ts").then((m) => m.default),
    add: () => import("./commands/add.ts").then((m) => m.default),
  },
});

export function main(): Promise<void> {
  return runMain(command);
}
