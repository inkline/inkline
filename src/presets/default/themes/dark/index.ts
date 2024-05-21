import type { RawTheme } from '../../../../types';
import type { PartialDeep } from 'type-fest';
import { border } from './border';
import { typography } from './typography';
import { elements } from './elements';

export const darkTheme: PartialDeep<RawTheme> = {
    border,
    typography,
    elements
};
