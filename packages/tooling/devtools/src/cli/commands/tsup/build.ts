import { exec } from '../../utils';
import { BuildCommandOptions } from '../../types';

export async function tsupBuild(options: BuildCommandOptions) {
    await exec(options.vue ? 'vue-tsc --noEmit' : 'tsc --noEmit');
    await exec('tsup');
}
