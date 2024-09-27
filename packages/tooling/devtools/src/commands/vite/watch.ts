import nodemon from 'nodemon';
import * as process from 'node:process';

export async function viteWatch(baseDir: string[], command: string = 'pnpm run build') {
    await new Promise<void>((resolve) => {
        nodemon({
            watch: baseDir,
            ext: 'ts,json',
            ignore: ["**/*.spec.ts"],
            script: '',
            exec: command,
            runOnChangeOnly: true
        }).on('quit', function () {
            resolve();
            process.exit();
        }).on('log', function (log) {
            console.log(log.colour);
        });
    });
}
