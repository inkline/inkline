import type { RawTheme } from '../../../../types';
import { elements } from './elements';
import { components } from './components';
import { boxShadow } from './boxShadow';
import { border } from './border';
import { borderRadius } from './borderRadius';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { grid } from './grid';
import { layers } from './layers';
import { scaleRatios } from './scaleRatios';
import { size } from './size';
import { margin, padding, spacing } from './spacing';
import { transition } from './transition';
import { typography } from './typography';

export const defaultTheme: RawTheme = {
    border,
    borderRadius,
    boxShadow,
    breakpoints,
    colors,
    grid,
    layers,
    scaleRatios,
    size,
    spacing,
    margin,
    padding,
    transition,
    typography,
    components,
    elements
};
