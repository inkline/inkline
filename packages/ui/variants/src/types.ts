import type { ComponentProps } from '@inkline/types';

export type PropertyFold = {
    fold: keyof ComponentProps;
    unfold: Array<keyof ComponentProps>;
};
