import nodemon from 'nodemon';
import * as process from 'node:process';

export async function watch(baseDir: string[], command: string = 'pnpm run build') {
    await new Promise<void>((resolve) => {
        nodemon({
            watch: baseDir,
            ext: '.ts',
            script: '',
            exec: command,
            runOnChangeOnly: true
        }).on('quit', function () {
            resolve();
            process.exit();
        });
    });
}
