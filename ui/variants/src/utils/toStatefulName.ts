import type { ComponentProps, ComponentVariantState } from '@inkline/types';

export function toStatefulName(
    propertyName: keyof ComponentProps,
    state: ComponentVariantState
): string {
    return state === 'default' ? `${propertyName}` : `${state}:${propertyName}`;
}
