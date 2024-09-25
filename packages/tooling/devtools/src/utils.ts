import { spawn } from "node:child_process";

export function exec(command: string) {
    const argv = command.split(" ");
    const cmd = argv.shift();

    spawn(cmd, argv, { stdio: "inherit" });
}
