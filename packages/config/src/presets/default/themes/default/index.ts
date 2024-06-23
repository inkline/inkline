import { elements } from './elements';
import { components } from './components';
import { boxShadow } from './boxShadow';
import { border } from './border';
import { borderRadius } from './borderRadius';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { grid } from './grid';
import { percentages } from './percentages';
import { scaleRatios } from './scaleRatios';
import { sizeMultiplier } from './sizeMultiplier';
import { margin, padding, spacing } from './spacing';
import { transition } from './transition';
import {
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textColor,
    textContrastColor
} from './typography';
import { defineTheme } from '../../../../utils';

export const defaultTheme = defineTheme({
    border,
    borderRadius,
    boxShadow,
    breakpoints,
    colors,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    grid,
    scaleRatios,
    sizeMultiplier,
    spacing,
    margin,
    padding,
    percentages,
    textColor,
    textContrastColor,
    textAlign,
    transition,
    components,
    elements
});
