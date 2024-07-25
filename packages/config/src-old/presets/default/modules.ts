import type { Module } from '../../types';
import {
    core,
    animation,
    border,
    borderRadius,
    boxShadow,
    breakpoints,
    colors,
    components,
    grid,
    scaleRatios,
    sizeMultiplier,
    percentages,
    spacing,
    typography,
    transition,
    layers,
    classifier
} from '../../modules';

export const defaultModules: Module[] = [
    core,
    classifier,
    animation,
    border,
    borderRadius,
    breakpoints,
    boxShadow,
    components,
    colors,
    grid,
    layers,
    scaleRatios,
    percentages,
    sizeMultiplier,
    spacing,
    typography,
    transition
];
