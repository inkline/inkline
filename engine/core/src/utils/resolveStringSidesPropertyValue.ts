import { SidesPropertyKeys, TokenValue } from '../types';

export function resolveStringSidesPropertyValue(
    value: string
): Record<SidesPropertyKeys, TokenValue> {
    const keys = ['top', 'right', 'bottom', 'left'] as const;
    const parts = (value ?? '').split(/\s+/);

    return keys.reduce(
        (acc, key, index) => {
            (acc as Record<string, string>)[key] = parts[index % 4] || parts[index % 2] || parts[0];
            return acc;
        },
        {} as Record<SidesPropertyKeys, TokenValue>
    );
}
