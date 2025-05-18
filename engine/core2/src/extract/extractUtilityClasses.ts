import { VariantState } from '@inkline/types';
import { UtilityClassEntry } from '../types';

export function extractUtilityClasses(code: string): UtilityClassEntry[] {
    const utilityClassesSeen = new Set<string>();
    const utilityClasses: UtilityClassEntry[] = [];
    const utilityRegex = /_([a-zA-Z-]+:)?([a-zA-Z-]+:)([\w-]+)/g;

    let match: RegExpExecArray | null;
    while ((match = utilityRegex.exec(code)) !== null) {
        const value = match.pop();
        const name = match.pop()?.slice(0, -1);
        const state = (match.pop()?.slice(0, -1) ?? 'default') as VariantState;

        if (!value || !name) {
            continue;
        }

        const cacheKey = `_${state}:${name}:${value}`;
        if (utilityClassesSeen.has(cacheKey)) {
            continue;
        }

        utilityClassesSeen.add(cacheKey);
        utilityClasses.push({ name, value, state });
    }

    return utilityClasses;
}
