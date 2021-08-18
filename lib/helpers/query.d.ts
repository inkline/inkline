/**
 * Find component by component instance name.
 * Mainly used for searching first matching child in component slots.
 *
 * @param items
 * @param name
 * @param maxDepth
 * @param currentDepth
 * @returns {Array}
 */
export declare function querySelector(items: any[], name: string, maxDepth?: number, currentDepth?: number): any;
/**
 * Find components by component instance name.
 * Mainly used for filtering and searching children in component slots.
 *
 * @param items
 * @param name
 * @param maxDepth
 * @param currentDepth
 * @returns {Array}
 */
export declare function querySelectorAll(items: any[], name: string, maxDepth?: number, currentDepth?: number): any[];
