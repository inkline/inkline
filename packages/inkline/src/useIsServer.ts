export function useIsServer() {
    const isServer = typeof window === 'undefined';

    return { isServer };
}
