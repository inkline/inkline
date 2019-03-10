

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
export function querySelector(items, name, maxDepth = 3, currentDepth = 0) {
    let result;

    for (const item of items) {
        const children = item.$children || (item.componentInstance || {}).$children || item.children;

        if ((item.$options || {}).name === name ||
            ((item.$options || {}).extends || {}).name === name ||
            ((item.componentInstance || {}).$options || {}).name === name ||
            (((item.componentInstance || {}).$options || {}).extends || {}).name === name) {
            result = item;
        }

        if (children && children.length > 0 && currentDepth < maxDepth && !result) {
            result = querySelector(children, name, maxDepth, currentDepth + 1);
        }

        if (result) {
            break;
        }
    }

    return result;
}

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
export function querySelectorAll(items, name, maxDepth = 3, currentDepth = 0) {
    let results = [];

    if (!items) { return results; }

    for (const item of items) {
        const children = item.$children || (item.componentInstance || {}).$children || item.children;

        if ((item.$options || {}).name === name ||
            ((item.$options || {}).extends || {}).name === name ||
            ((item.componentInstance || {}).$options || {}).name === name ||
            (((item.componentInstance || {}).$options || {}).extends || {}).name === name) {
            results.push(item);
        }

        if (children && children.length > 0 && currentDepth < maxDepth) {
            results = results.concat(querySelectorAll(children, name, maxDepth, currentDepth + 1))
        }
    }

    return results;
}