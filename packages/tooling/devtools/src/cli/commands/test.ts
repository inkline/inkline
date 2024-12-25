import type { TestCommandOptions } from '../types';
import { exec } from '../utils';

export async function test(options: TestCommandOptions) {
    const argv = options.coverage ? ' --coverage' : '';

    if (options.watch) {
        await exec(`vitest${argv}`);
    } else {
        await exec(`vitest run${argv}`);
    }
}
