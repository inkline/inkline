import type { TestCommandOptions } from "../types";
import { exec } from "../utils";

export function test(options: TestCommandOptions) {
    const argv = options.coverage ? " --coverage" : "";

    if (options.watch) {
        exec(`vitest${argv}`);
    } else {
        exec(`vitest run${argv}`);
    }
}
