import { exec } from '../../utils';

export async function tsupWatch() {
    return exec('tsup --watch');
}
