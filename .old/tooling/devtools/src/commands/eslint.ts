import { exec } from '../utils';

export async function eslint() {
    await exec('eslint -c eslint.config.mjs src');
}
