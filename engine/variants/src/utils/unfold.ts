import { propertyFoldingDefinitions } from '../constants';
import type { ComponentProps } from '@inkline/types';

const unfoldByKey = propertyFoldingDefinitions.reduce<
    Record<keyof ComponentProps, Array<keyof ComponentProps>>
>(
    (acc, entry) => {
        acc[entry.fold] = entry.unfold;
        return acc;
    },
    {} as Record<keyof ComponentProps, Array<keyof ComponentProps>>
);

export function unfold(input: ComponentProps): ComponentProps {
    const result: ComponentProps = {};

    for (const [key, value] of Object.entries(input)) {
        const foldDefinition = unfoldByKey[key as keyof ComponentProps];
        if (foldDefinition) {
            for (const unfoldedKey of foldDefinition) {
                result[unfoldedKey] = value;
            }
        } else {
            result[key] = value;
        }
    }

    return result;
}
