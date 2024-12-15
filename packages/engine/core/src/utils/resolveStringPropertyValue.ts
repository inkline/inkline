import { TokenValue } from '../types';

export function resolveStringPropertyValue<Keys extends string, T extends Record<Keys, TokenValue>>(
    value: string,
    returnKeys: Keys[]
): T {
    const parts = (value ?? '').split(/\s+/);

    return returnKeys.reduce<T>((acc, key, index) => {
        (acc as Record<string, string>)[key] = parts[index];
        return acc;
    }, {} as T);
}
