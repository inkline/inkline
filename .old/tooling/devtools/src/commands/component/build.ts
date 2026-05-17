import { exec } from '../../utils';

export async function componentBuild() {
    await exec('vue-tsc -p tsconfig.json');
    await exec('vite build');
    await exec('tsup');
}
