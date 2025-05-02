import { baseProps } from './base';
import { gridProps } from './grid';
import { typographyProps } from './typography';

export const variantProps = {
    ...baseProps,
    ...gridProps,
    ...typographyProps
} as const;
