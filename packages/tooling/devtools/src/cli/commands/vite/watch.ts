import nodemon from 'nodemon';
import * as process from 'node:process';
import path from 'path';
import type { WatchCommandOptions } from '../../types';

export async function viteWatch(options: WatchCommandOptions) {
    const patterns = options.pattern.map((pattern) => path.resolve(process.cwd(), pattern));
    const command = options.script ?? 'pnpm run build';

    return new Promise<void>((resolve) => {
        nodemon({
            watch: patterns,
            ext: 'vue,ts,json',
            ignore: ['**/*.spec.ts'],
            script: '',
            exec: command,
            runOnChangeOnly: true
        })
            .on('quit', function () {
                resolve();
                process.exit();
            })
            .on('log', function (log) {
                console.log(log.colour);
            });
    });
}
