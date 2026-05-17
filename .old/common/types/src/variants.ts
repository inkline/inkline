import type { ComponentProps } from './props';

export type VariantProps = ComponentProps & {
    extends?: string | string[];
};

export type VariantState =
    | 'default'
    | 'active'
    | 'hover'
    | 'focus'
    | 'visited'
    | 'disabled'
    | 'readonly';

export type ValueByVariantState<T> = {
    default?: T;
    active?: T;
    hover?: T;
    focus?: T;
    visited?: T;
    disabled?: T;
    readonly?: T;
};
