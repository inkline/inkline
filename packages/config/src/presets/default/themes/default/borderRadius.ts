import type { RawTheme } from '../../../../types';
import { sizeMultiplierVariants } from '../../../common';

export const borderRadius: RawTheme['borderRadius'] = {
    default: '4px',
    ...sizeMultiplierVariants
};
