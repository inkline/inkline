import { hash } from './utils';
import type { FileOptions } from './types';

/**
 * Adds a variable to a theme.
 *
 * If `options.default` is `true`, the variable will only be added if it does not already exist in the theme.
 */
export function file(path: string, content: string, options: FileOptions) {
    const { files } = options.context;
    const id = hash(content);

    if (files.find((file) => file.id === id)) return;

    files.push({ id, path, content, options });
}
