import type { Context } from './types';

/**
 * Context
 *
 * @field themes Each key represents a theme. The default theme is 'default'.
 * @field files Each entry represents a file that will be generated.
 */

export function createContext(): Context {
    return {
        themes: {},
        files: []
    };
}
