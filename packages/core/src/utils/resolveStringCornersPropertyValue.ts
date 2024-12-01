import { CornersPropertyKeys, TokenValue } from '../types';

export function resolveStringCornersPropertyValue(
    value: string
): Record<CornersPropertyKeys, TokenValue> {
    const keys = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'] as const;
    const parts = (value ?? '').split(/\s+/);

    return keys.reduce(
        (acc, key, index) => {
            (acc as Record<string, string>)[key] = parts[index % 4] || parts[index % 2] || parts[0];
            return acc;
        },
        {} as Record<CornersPropertyKeys, TokenValue>
    );
}
