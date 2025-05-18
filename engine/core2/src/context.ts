import { createMerge } from '@inkline/utils';
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

export function mergeContexts(...contexts: Context[]): Context {
    const merge = createMerge({
        mergeArrays: true,
        uniqueArrayItems: true
    });

    return contexts.reduce((acc, context) => merge(acc, context) as Context, createContext());
}
