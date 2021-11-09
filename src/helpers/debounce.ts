/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked, or until the next browser frame is drawn.
 *
 * @param fn
 * @param delay
 * @returns {Function}
 */
export function debounce (fn: any, delay: number) {
    let inDebounce: any;

    return function (...args: any[]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const context = this; // eslint-disable-line @typescript-eslint/no-this-alias, no-invalid-this

        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => fn.apply(context, args), delay);
    };
}
