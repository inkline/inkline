import type { ComponentProps, ComponentVariantProps } from '@inkline/types';

export type PropertyFold = {
    fold: keyof ComponentProps;
    unfold: Array<keyof ComponentProps>;
};

export type VariantType = string | string[] | ComponentVariantProps;
