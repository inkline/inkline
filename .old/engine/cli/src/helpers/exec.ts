import { exec } from 'child_process';

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */

export async function execShellCommand(cmd: string): Promise<string> {
    return new Promise((resolve) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }

            resolve(stdout || stderr);
        });
    });
}
