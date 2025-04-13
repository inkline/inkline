import type { Context } from './types';
import { nanoid } from 'nanoid';

/**
 * Context
 *
 * @field themes Each key represents a theme. The default theme is 'default'.
 * @field files Each entry represents a file that will be generated.
 */

export function createContext(): Context {
    return {
        id: nanoid(),
        themes: {},
        files: []
    };
}
