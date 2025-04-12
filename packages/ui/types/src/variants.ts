import type { ComponentProps } from './props';

export type ComponentVariantProps = ComponentProps & {
    extends?: string | string[];
};

export type ComponentVariantState =
    | 'default'
    | 'active'
    | 'hover'
    | 'focus'
    | 'visited'
    | 'disabled'
    | 'readonly';
