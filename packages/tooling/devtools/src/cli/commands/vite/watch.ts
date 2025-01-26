import * as chokidar from 'chokidar';
import process from 'node:process';
import path from 'path';
import type { WatchCommandOptions } from '../../types';
import { exec } from '../../utils';

export async function viteWatch(options: WatchCommandOptions) {
    const patterns = options.pattern.map((pattern) => path.resolve(process.cwd(), pattern));
    const command = options.script ?? 'pnpm run build';

    let isFirstRun = true;
    let isProcessing = false;

    console.log(`Watching for changes in ${options.pattern.join(', ')}`);

    return new Promise<void>((resolve, reject) => {
        const watcher = chokidar.watch(patterns, {
            ignored: ['**/*.spec.ts'],
            persistent: true,
            ignoreInitial: true
        });

        // Helper function to execute the command
        async function executeCommand() {
            if (isProcessing) return;
            isProcessing = true;

            try {
                await exec(command);
            } catch (error) {
                console.error(`Error executing command: ${(error as Error).message}`);
            } finally {
                isProcessing = false;
            }
        }

        // Setup event handlers
        watcher
            .on('add', (path) => {
                console.log(`File ${path} has been added`);
                if (!isFirstRun) void executeCommand();
            })
            .on('change', (path) => {
                console.log(`File ${path} has been changed`);
                void executeCommand();
            })
            .on('unlink', (path) => {
                console.log(`File ${path} has been removed`);
                if (!isFirstRun) void executeCommand();
            })
            .on('error', (error) => {
                console.error(`Watcher error: ${error}`);
                reject(error);
            });

        // Handle process termination
        process.on('SIGINT', () => {
            void watcher.close().then(() => {
                console.log('Watcher closed.');
                resolve();
                process.exit(0);
            });
        });

        isFirstRun = false;
    });
}
