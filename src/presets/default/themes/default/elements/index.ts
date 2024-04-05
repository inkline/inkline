import type { RawTheme } from '../../../../../types';
import { samp } from './samp';
import { pre } from './pre';
import { kbd } from './kbd';
import { h1, h2, h3, h4, h5, h6 } from './heading';
import { d1, d2, d3, d4, d5, d6 } from './display';
import { code } from './code';
import { body } from './body';

export const elements: RawTheme['elements'] = {
    body,
    code,
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    kbd,
    pre,
    samp
};
