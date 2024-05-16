export function matchKey(key: string, pattern: string | RegExp): boolean {
    if (typeof pattern === 'string') {
        return key === pattern;
    }

    return pattern.test(key);
}
