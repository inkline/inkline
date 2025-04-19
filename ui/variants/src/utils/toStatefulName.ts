import type { ComponentProps, VariantState } from '@inkline/types';

export function toStatefulName(propertyName: keyof ComponentProps, state: VariantState): string {
    return state === 'default' ? `${propertyName}` : `${state}:${propertyName}`;
}
