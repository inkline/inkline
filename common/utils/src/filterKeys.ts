/**
 * Filter object keys using an allowlist and denylist string or RegEx array
 */

export function filterKeys<T extends Record<string, any>>(
    source: T,
    options: { allowlist?: Array<string | RegExp>; denylist?: Array<string | RegExp> }
): Partial<T> {
    const { allowlist, denylist } = options;

    return Object.keys(source).reduce<Partial<T>>((acc, key: string) => {
        let matches = true;

        if (allowlist?.length) {
            matches =
                matches &&
                allowlist.some((pattern) => {
                    if (typeof pattern === 'string') {
                        return key === pattern;
                    }

                    return key.match(pattern);
                });
        }

        if (denylist?.length) {
            matches =
                matches &&
                !denylist.some((pattern) => {
                    if (typeof pattern === 'string') {
                        return key === pattern;
                    }

                    return key.match(pattern);
                });
        }

        if (matches) {
            (acc as Record<string, any>)[key] = (source as Record<string, any>)[key];
        }

        return acc;
    }, {});
}
