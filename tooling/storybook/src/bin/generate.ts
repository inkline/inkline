import { watch as nodeWatch } from "node:fs";
import { runCli } from "./cli.ts";
import { generate } from "../generator/index.ts";

async function main(): Promise<void> {
  process.exitCode = await runCli(process.argv.slice(2), {
    generate,
    watch: nodeWatch,
    io: {
      log: (message) => console.log(message),
      error: (message) => console.error(message),
    },
    cwd: process.cwd(),
  });
}

void main();
