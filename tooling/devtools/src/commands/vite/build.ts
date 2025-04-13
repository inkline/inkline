import { exec } from '../../utils';
import type { BuildCommandOptions } from '../../types';

export async function viteBuild(options: BuildCommandOptions) {
    await exec(options.vue ? 'vue-tsc' : 'tsc');
    await exec('vite build');
}
