import type { ComponentProps, VariantProps } from '@inkline/types';

export type PropertyFold = {
    fold: keyof ComponentProps;
    unfold: Array<keyof ComponentProps>;
};

export type VariantNameOrProps = string | string[] | VariantProps;
