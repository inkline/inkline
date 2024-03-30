import { minimatch } from 'minimatch';

export function matchKey(key: string, pattern: string): boolean {
    return minimatch(key, pattern);
}
