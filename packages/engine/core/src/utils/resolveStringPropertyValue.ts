import { TokenValue } from '../types';

export function resolveStringPropertyValue<Keys extends string, T extends Record<Keys, TokenValue>>(
    value: string,
    returnKeys: Keys[]
): T {
    if (!value) return {} as T;

    const parts = tokenize(value);
    return mapPartsToKeys(parts, returnKeys);
}

function tokenize(value: string): string[] {
    const parts: string[] = [];
    let currentPart = '';
    let inParens = 0;
    let inVar = false;

    for (const char of value) {
        if (shouldStartNewPart(char, currentPart, inParens, inVar)) {
            parts.push(currentPart.trim());
            currentPart = '';
            continue;
        }

        if (char === '(') {
            inParens++;
        } else if (char === ')') {
            inParens--;
            inVar = inParens > 0;
        } else if (
            char === 'v' &&
            value.indexOf('var(', value.indexOf(char)) === value.indexOf(char)
        ) {
            inVar = true;
        }

        currentPart += char;
    }

    if (currentPart) {
        parts.push(currentPart.trim());
    }

    return parts.filter(Boolean);
}

function shouldStartNewPart(
    char: string,
    currentPart: string,
    inParens: number,
    inVar: boolean
): boolean {
    return char === ' ' && !!currentPart && !inParens && !inVar;
}

function mapPartsToKeys<Keys extends string, T extends Record<Keys, TokenValue>>(
    parts: string[],
    keys: Keys[]
): T {
    return keys.reduce((acc, key, index) => {
        if (index < parts.length) {
            (acc as Record<string, string>)[key] = parts[index];
        }
        return acc;
    }, {} as T);
}
