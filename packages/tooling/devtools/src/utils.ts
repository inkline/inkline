import { spawn } from "node:child_process";

export function exec(command: string) {
    const argv = command.split(" ");
    const cmd = argv.shift();

    if (!cmd) {
        throw new Error(`Invalid command: ${command}`);
    }

    spawn(cmd, argv, { stdio: "inherit" });
}
