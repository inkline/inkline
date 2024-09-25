import { stat } from 'fs/promises';

/**
 * Files
 */

export async function exists(file: string) {
    try {
        await stat(file);
        return true;
    } catch {
        return false;
    }
}
