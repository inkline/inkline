import type { ComponentProps } from '@inkline/types';
import { propertyFoldingDefinitions } from '../constants';

export function fold(input: ComponentProps): ComponentProps {
    const result = { ...input };
    const usedKeys = new Set<keyof ComponentProps>();

    for (const { fold, unfold } of propertyFoldingDefinitions) {
        // Skip if any of the keys were already used in a previous fold
        if (unfold.some((key) => usedKeys.has(key))) continue;

        const values = unfold.map((key) => result[key]);
        const allDefined = values.every((v) => v !== undefined);
        const allEqual = values.every((v) => v === values[0]);

        if (allDefined && allEqual) {
            // Assign the folded value
            result[fold] = values[0] as string;

            // Remove unfolded keys
            for (const key of unfold) {
                delete result[key];
                usedKeys.add(key);
            }
        }
    }

    return result;
}
