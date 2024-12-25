import { state } from './globals';
import { hash } from './utils';

/**
 * Adds a variable to a theme.
 *
 * If `options.default` is `true`, the variable will only be added if it does not already exist in the theme.
 */
export function file(
    path: string,
    content: string,
    options?: { append?: boolean; prepend?: boolean }
) {
    const id = hash(content);

    if (state.files.find((file) => file.id === id)) return;

    state.files.push({ id, path, content, options });
}
