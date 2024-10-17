import { exec } from '../../utils';

export async function componentBuild() {
    await exec('vue-tsc');
    await exec('vite build');
    await exec('tsup');
}
